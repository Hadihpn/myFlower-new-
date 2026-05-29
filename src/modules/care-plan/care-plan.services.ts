import { Injectable, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, LessThan } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { CarePlan } from './entities/care-plan.entity';
import { CareTask } from '@/modules/care-task/entities/care-task.entity';
import { UserPlantSelection } from '@/modules/user-plant-selections/entities/user-plant-selection.entity';
import { SensorReadingsService } from '@/modules/sensor-readings/sensor-readings.service';
import { AiService } from '@/modules/ai/ai.service';
import { CarePlanStatus } from './enums/carePlanStatus.enum';
import { GeneratorType } from './enums/generatorType.enum';
import { TaskType } from '@/modules/care-task/enums/taskType.enum';
import { TaskStatus } from '@/modules/care-task/enums/taskStatus.enum';
import { OptimalTime } from '@/modules/care-task/enums/optimalType.enum';
import { NotificationsService } from '../notifications/notifications.service';
interface TasksByEmail {
  [email: string]: {
    userId: number;
    userName: string;
    tasks: CareTask[];
  };
}

@Injectable()
export class CarePlanService {
  private readonly logger = new Logger(CarePlanService.name);
  private readonly PLAN_DURATION_DAYS = 28;
  private readonly AI_Requested_TIMES = 2;
  private readonly MIN_SENSOR_DAYS_FOR_AI = 7;

  constructor(
    @InjectRepository(CarePlan)
    private carePlanRepo: Repository<CarePlan>,
    @InjectRepository(CareTask)
    private careTaskRepo: Repository<CareTask>,
    @InjectRepository(UserPlantSelection)
    private userPlantSelectionRepo: Repository<UserPlantSelection>,
    private sensorReadingsService: SensorReadingsService,
    private aiService: AiService,
    private notificationService: NotificationsService,
  ) {}

  async createInitialPlan(userPlantSelectionId: number) {
    console.log('createInitialPlan', userPlantSelectionId);
    const selection = await this.userPlantSelectionRepo.findOne({
      where: { id: userPlantSelectionId },
      // relations: ['device', 'plantSpecies', 'plantGroup'],
    });

    console.log('selection :', selection);
    if (!selection) {
      throw new NotFoundException('UserPlantSelection not found');
    }
    const deviceAge = await this.getDeviceDataAge(selection.deviceId);
    console.log('deviceAge :', deviceAge);
    console.log('this.MIN_SENSOR_DAYS_FOR_AI ', this.MIN_SENSOR_DAYS_FOR_AI);
    

    const useAi = deviceAge >= this.MIN_SENSOR_DAYS_FOR_AI;
    console.log('deviceAge', deviceAge);
    console.log('useAi', useAi);

    this.logger.log(
      `Creating plan for selection ${userPlantSelectionId}, deviceAge: ${deviceAge}, useAi: ${useAi}`,
    );

    if (useAi) {
      try {
        console.log('useAi tru');
        return await this.generateAiBasedPlan(selection);
      } catch (error) {
        console.log('userAi false');
        // this.logger.warn('AI failed, falling back to rule-based', error);
        // return await this.generateRuleBasedPlan(selection);
      }
    } else {
      console.log('userAi false');
      return await this.generateRuleBasedPlan(selection);
    }
  }

  private async generateAiBasedPlan(selection: UserPlantSelection) {
    let carePlan;
    //  carePlan = await this.aiActiveCarePlanUsed(selection.deviceId);
    // if(carePlan.aiRequestedTime >this.AI_Requested_TIMES){
    //   throw new NotAcceptableException("شما از سهمیه استفاده از هوش مصنوعی خود استفاده کرده اید. میتوانید طبق جدول قبلی تولید شده به مراقبت از گیاهان خود ادامه دهید")
    // }
    console.log('generateAiBasedPlan');
    const sensorSnapshot = await this.buildSensorSnapshot(selection.deviceId);
    // console.log('sensorSnapshot :', sensorSnapshot);

    const aiResponse = await this.aiService.generateCarePlan(selection, sensorSnapshot);
    console.log('aiResponse :', aiResponse);

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + this.PLAN_DURATION_DAYS);
    console.log('plan service', selection.id, aiResponse.reasoning.toString());

    if(!carePlan|| carePlan<this.AI_Requested_TIMES){
       carePlan = await this.carePlanRepo.create({
      userPlantSelectionId: selection.id,
      status: CarePlanStatus.ACTIVE,
      generatorType: GeneratorType.AI,
      startDate,
      endDate,
      sensorSnapshot,
      // lastAiUsed:startDate,
      // aiRequestedTime:1,
      aiRecommendations: 'aiResponse.reasoning',

    });
    }
    const plan = await this.carePlanRepo.create({
      userPlantSelectionId: selection.id,
      status: CarePlanStatus.ACTIVE,
      generatorType: GeneratorType.AI,
      startDate,
      endDate,
      sensorSnapshot,
      // lastAiUsed:startDate,
      // aiRequestedTime:1,
      aiRecommendations: 'aiResponse.reasoning',

    });

    await this.carePlanRepo.save(plan);

    const tasks = aiResponse.tasks.map((task) =>
      this.careTaskRepo.create({
        carePlanId: plan.id,
        taskType: task.taskType as TaskType,
        scheduledDate: new Date(task.scheduledDate),
        optimalTime: task.optimalTime as OptimalTime,
        status: TaskStatus.PENDING,
        instructions: task.instructions,
        shopProductType: task.shopProductType,
      }),
    );

    await this.careTaskRepo.save(tasks);

    this.logger.log(`AI plan created: ${plan.id} with ${tasks.length} tasks`);
    return plan;
  }

  private async generateRuleBasedPlan(selection: UserPlantSelection): Promise<CarePlan> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + this.PLAN_DURATION_DAYS);

    const plan = this.carePlanRepo.create({
      userPlantSelectionId: selection.id,
      status: CarePlanStatus.ACTIVE,
      generatorType: GeneratorType.RULE_BASED,
      startDate,
      endDate,
      sensorSnapshot: null,
      aiRecommendations: null,
    });

    await this.carePlanRepo.save(plan);

    const tasks = this.generateRuleBasedTasks(plan.id, startDate);
    await this.careTaskRepo.save(tasks);

    this.logger.log(`Rule-based plan created: ${plan.id} with ${tasks.length} tasks`);
    return plan;
  }

  private generateRuleBasedTasks(carePlanId: number, startDate: Date): CareTask[] {
    const tasks: CareTask[] = [];

    // Watering: every 3 days
    for (let day = 0; day < this.PLAN_DURATION_DAYS; day += 3) {
      const scheduledDate = new Date(startDate);
      scheduledDate.setDate(scheduledDate.getDate() + day);

      tasks.push(
        this.careTaskRepo.create({
          carePlanId,
          taskType: TaskType.WATERING,
          scheduledDate,
          optimalTime: OptimalTime.MORNING,
          status: TaskStatus.PENDING,
          instructions: 'Water the plant thoroughly until soil is moist.',
          shopProductType: null,
        }),
      );
    }

    // Fertilizing: day 7, 21
    [7, 21].forEach((day) => {
      const scheduledDate = new Date(startDate);
      scheduledDate.setDate(scheduledDate.getDate() + day);

      tasks.push(
        this.careTaskRepo.create({
          carePlanId,
          taskType: TaskType.FERTILIZING,
          scheduledDate,
          optimalTime: OptimalTime.MORNING,
          status: TaskStatus.PENDING,
          instructions: 'Apply balanced fertilizer according to package instructions.',
          shopProductType: 'nitrogen_fertilizer',
        }),
      );
    });

    // Pruning: day 14
    const pruningDate = new Date(startDate);
    pruningDate.setDate(pruningDate.getDate() + 14);

    tasks.push(
      this.careTaskRepo.create({
        carePlanId,
        taskType: TaskType.PRUNING,
        scheduledDate: pruningDate,
        optimalTime: OptimalTime.AFTERNOON,
        status: TaskStatus.PENDING,
        instructions: 'Remove dead or yellowing leaves.',
        shopProductType: 'pruning_tool',
      }),
    );

    return tasks;
  }

  async triggerAiRecalibration(carePlanId: number): Promise<CarePlan> {
    const oldPlan = await this.carePlanRepo.findOne({
      where: { id: carePlanId },
      relations: [
        'userPlantSelection',
        'userPlantSelection.device',
        'userPlantSelection.plantSpecies',
        'userPlantSelection.plantGroup',
      ],
    });

    if (!oldPlan) {
      throw new NotFoundException('CarePlan not found');
    }

    // Cancel old plan
    oldPlan.status = CarePlanStatus.CANCELLED;
    await this.carePlanRepo.save(oldPlan);

    // Cancel pending tasks
    await this.careTaskRepo.update(
      { carePlanId: oldPlan.id, status: TaskStatus.PENDING },
      { status: TaskStatus.CANCELLED },
    );

    this.logger.log(`Plan ${carePlanId} cancelled due to skip feedback`);

    // Create new AI plan with feedback context
    const sensorSnapshot = await this.buildSensorSnapshot(oldPlan.userPlantSelection.deviceId);
    const skipFeedback = 'User skipped 3 consecutive tasks of same type';

    const aiResponse = await this.aiService.generateCarePlan(
      oldPlan.userPlantSelection,
      sensorSnapshot,
      skipFeedback,
    );

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + this.PLAN_DURATION_DAYS);

    const newPlan = this.carePlanRepo.create({
      userPlantSelectionId: oldPlan.userPlantSelectionId,
      status: CarePlanStatus.ACTIVE,
      generatorType: GeneratorType.AI,
      startDate,
      endDate,
      sensorSnapshot,
      aiRecommendations: aiResponse.reasoning,
    });

    await this.carePlanRepo.save(newPlan);

    const tasks = aiResponse.tasks.map((task) =>
      this.careTaskRepo.create({
        carePlanId: newPlan.id,
        taskType: task.taskType as TaskType,
        scheduledDate: new Date(task.scheduledDate),
        optimalTime: task.optimalTime as OptimalTime,
        status: TaskStatus.PENDING,
        instructions: task.instructions,
        shopProductType: task.shopProductType,
      }),
    );

    await this.careTaskRepo.save(tasks);

    this.logger.log(`Recalibrated plan created: ${newPlan.id}`);
    return newPlan;
  }

  async cancelCurrentPlan(userPlantSelectionId: number): Promise<void> {
    const activePlan = await this.carePlanRepo.findOne({
      where: {
        userPlantSelectionId,
        status: CarePlanStatus.ACTIVE,
      },
    });

    if (activePlan) {
      activePlan.status = CarePlanStatus.CANCELLED;
      await this.carePlanRepo.save(activePlan);

      await this.careTaskRepo.update(
        { carePlanId: activePlan.id, status: TaskStatus.PENDING },
        { status: TaskStatus.CANCELLED },
      );

      this.logger.log(`Plan ${activePlan.id} cancelled`);
    }
  }

  @Cron('0 0 * * *')
  async checkExpiredPlans(): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiredPlans = await this.carePlanRepo.find({
      where: {
        endDate: LessThanOrEqual(today),
        status: CarePlanStatus.ACTIVE,
      },
      relations: ['userPlantSelection'],
    });

    for (const plan of expiredPlans) {
      plan.status = CarePlanStatus.COMPLETED;
      await this.carePlanRepo.save(plan);

      await this.createInitialPlan(plan.userPlantSelectionId);

      this.logger.log(`Plan ${plan.id} completed, new plan created`);
    }
  }

  private async getDeviceDataAge(deviceId: string): Promise<number> {
    const count = await this.sensorReadingsService.getReadingsForDevice(deviceId); 
    return count.length > 0 ? 7 : 0;
  }
//  private async aiActiveCarePlanUsed(deviceId: string): Promise<CarePlan> {
//     const carePlan = await this.carePlanRepo.findOne({where:{active:true}}); 
//     return carePlan;
//   }
  private async buildSensorSnapshot(deviceId: string): Promise<Record<string, any>> {
    const readings = await this.sensorReadingsService.getReadingsForDevice(deviceId);
    console.log(' buildSensorSnapshot readings : ', readings[0]);
    if (readings.length === 0) {
      return {};
    }

    const avgTemperature =
      readings.reduce(
        (sum, r) => parseInt(sum.toString()) + (parseInt(r.temperature.toString()) || 0),
        0,
      ) / readings.length;

    // readings.reduce((sum, r) => parseInt(sum.toString()) + (parseInt(r.temperature.toString()) || 0), 0) / readings.length;
    console.log('avgTemperature :', avgTemperature);

    const avgHumidity =
      readings.reduce(
        (sum, r) => parseInt(sum.toString()) + (parseInt(r.humidity.toString()) || 0),
        0,
      ) / readings.length;

    // readings.reduce((sum, r) => sum + (r.humidity || 0), 0) / readings.length;
    console.log('avgHumidity :', avgHumidity);
    const avgSoilMoisture =
      readings.reduce(
        (sum, r) => parseInt(sum.toString()) + (parseInt(r.moisture.toString()) || 0),
        0,
      ) / readings.length;
    // readings.reduce((sum, r) => sum + (r.moisture || 0), 0) / readings.length;
    console.log('avgSoilMoisture :', avgSoilMoisture);
    const avgLight =
      readings.reduce(
        (sum, r) => parseInt(sum.toString()) + (parseInt(r.light.toString()) || 0),
        0,
      ) / readings.length;
    // readings.reduce((sum, r) => sum + (r.light || 0), 0) / readings.length;
    console.log('avgLight :', avgLight);
    return {
      avgTemperature: avgTemperature.toFixed(1),
      avgHumidity: avgHumidity.toFixed(1),
      avgSoilMoisture: avgSoilMoisture.toFixed(1),
      avgLight: avgLight.toFixed(0),
      readingsCount: readings.length,
    };
  }

  // notifications.service.ts
  @Cron('0 8 * * *')
  async sendDailyTaskReminders() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const tasks = await this.careTaskRepo.find({
      where: {
        scheduledDate: tomorrow,
        status: TaskStatus.PENDING,
      },
      relations: [
        'plan', // CarePlan
        'plan.userPlantSelection', // UserPlantSelection
        'plan.userPlantSelection.user', // User
      ],
    });

    // گروه‌بندی tasks بر اساس userId
    const tasksByUser = tasks.reduce<TasksByEmail>((acc, task) => {
      const user = task.carePlan.userPlantSelection.user;
      const userEmail = user.email; // ✅ مستقیم از relation

      if (!acc[userEmail]) {
        acc[userEmail] = {
          userId: user.id,
          userName: user.fullName,
          tasks: [],
        };
      }
      acc[userEmail].tasks.push(task);
      return acc;
    }, {});
    for (const [email, data] of Object.entries(tasksByUser)) {
      const tasksJson = JSON.stringify(
        data.tasks.map((task) => ({
          id: task.id,
          type: task.taskType,
          instruction: task.instructions,
          scheduledDate: task.scheduledDate,
          optimalTime: task.optimalTime,
          status: task.status,
        })),
        null,
        2,
      );

      for (const [email, data] of Object.entries(tasksByUser)) {
        await this.notificationService.sendEmail(email, 'یادآوری', tasksJson);
      }
      // // ارسال نوتیفیکیشن برای هر کاربر
      // for (const [userId, userTasks] of Object.entries(tasksByUser)) {
      //   const message = `You have ${userTasks.length} task(s) for tomorrow:\n` +
      //     userTasks.map(t => `• ${t.taskType}: ${t.instructions}`).join('\n');
      //   await this.notificationService.sendEmail(user)
      //   await this.sendNotification(Number(userId), message);
    }
  }
}
