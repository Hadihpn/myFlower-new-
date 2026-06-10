import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CareTask } from './entities/care-task.entity';
import { TaskStatus } from './enums/taskStatus.enum';
import { CareTaskFeedback } from '../care-task-feedback/entities/care-task-feedback.entity';
import { FeedbackAction } from '../care-task-feedback/enums/feedbackAction.enum';

@Injectable()
export class CareTaskService {
  constructor(
    @InjectRepository(CareTask)
    private readonly careTaskRepo: Repository<CareTask>,
    @InjectRepository(CareTaskFeedback)
    private readonly feedbackRepo: Repository<CareTaskFeedback>,
  ) {}

  async createTask(task: Partial<CareTask>): Promise<CareTask> {
    const entity = this.careTaskRepo.create(task);
    return this.careTaskRepo.save(entity);
  }

  async createMany(tasks: Partial<CareTask>[]): Promise<CareTask[]> {
    const entities = this.careTaskRepo.create(tasks);
    return this.careTaskRepo.save(entities);
  }

  async findByPlan(carePlanId: number): Promise<CareTask[]> {
    return this.careTaskRepo.find({
      where: { carePlanId },
      order: { scheduledDate: 'ASC' },
    });
  }

  async updateStatus(taskId: number, status: TaskStatus) {
    await this.careTaskRepo.update(taskId, { status });
  }

  async cancelPendingTasks(carePlanId: number) {
    await this.careTaskRepo.update(
      { carePlanId, status: TaskStatus.PENDING },
      { status: TaskStatus.CANCELLED },
    );
  }

  async findPendingTasks(carePlanId: number) {
    return this.careTaskRepo.find({
      where: {
        carePlanId,
        status: TaskStatus.PENDING,
      },
    });
  }
  async completeTask(taskId: number, feedback?: string): Promise<CareTask> {
    const task = await this.careTaskRepo.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task ${taskId} not found`);
    }

    task.status = TaskStatus.COMPLETED;
    task.completedAt = new Date();
    await this.careTaskRepo.save(task);

    if (feedback) {
      await this.createFeedback(taskId, feedback, FeedbackAction.COMPLETED);
    }

    return task;
  }

  async skipTask(taskId: number, reason?: string): Promise<CareTask> {
    const task = await this.careTaskRepo.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task ${taskId} not found`);
    }

    task.status = TaskStatus.SKIPPED;
    await this.careTaskRepo.save(task);

    if (reason) {
      await this.createFeedback(taskId, reason, FeedbackAction.SKIPPED);
    }

    return task;
  }

  async getTodayTasks(userId: number): Promise<CareTask[]> {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎯 Protected Route Handler Executed: getTodayTasks');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('User ID from request: ', userId);
   const now = new Date();

const today = new Date(Date.UTC(
  now.getUTCFullYear(),
  now.getUTCMonth(),
  now.getUTCDate()
));

const tomorrow = new Date(Date.UTC(
  now.getUTCFullYear(),
  now.getUTCMonth(),
  now.getUTCDate() + 1
));
      console.log("today", today)
      console.log("tomorrow", tomorrow)

    // return this.careTaskRepo
    //   .createQueryBuilder('task')
    //   .innerJoin('task.carePlan', 'plan')
    //   .where('plan.userId = :userId', { userId })
    //   .andWhere('task.scheduledDate >= :today', { today })
    //   .andWhere('task.scheduledDate < :tomorrow', { tomorrow })
    //   .andWhere('task.status = :status', { status: TaskStatus.PENDING })
    //   .orderBy('task.optimalTime', 'ASC')
    //   .addOrderBy('task.scheduledDate', 'ASC')
    //   .getMany();

    const res= await this.careTaskRepo
      .createQueryBuilder('task')
      .innerJoin('task.carePlan', 'plan')
      .innerJoin('plan.userPlantSelection', 'selection')
      .innerJoin('selection.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('task.scheduledDate >= :today', { today })
      .andWhere('task.scheduledDate < :tomorrow', { tomorrow })
      // .andWhere('task.status = :status', { status: TaskStatus.PENDING })
      .orderBy('task.optimalTime', 'ASC')
      .addOrderBy('task.scheduledDate', 'ASC')
      .getMany();
      console.log("Ressss", res)
      return res;
  }
  async getTaskUserId(taskId: number): Promise<number> {
    return await this.careTaskRepo
      .createQueryBuilder('task')
      .innerJoinAndSelect('task.carePlan', 'plan')
      .innerJoinAndSelect('plan.userPlantSelection', 'selection')
      .innerJoinAndSelect('selection.user', 'user')
      .where('task.id = :taskId', { taskId })
      .select('user.id', 'userId')
      .getRawOne();
  }
  async createFeedback(
    taskId: number,
    reason: string,
    feedbackAction: FeedbackAction,
  ): Promise<CareTaskFeedback> {
    const feedback = this.feedbackRepo.create({
      careTaskId: taskId,
      userId: 1,
      action: feedbackAction,
      reason,
      createdAt: new Date(),
    });
    return this.feedbackRepo.save(feedback);
  }

  async getTaskFeedback(taskId: number): Promise<CareTaskFeedback[]> {
    return this.feedbackRepo.find({
      where: { careTaskId: taskId },
      order: { createdAt: 'DESC' },
    });
  }

  async getSkippedTasksForRecalibration(carePlanId: number) {
    return this.careTaskRepo.find({
      where: {
        carePlanId,
        status: TaskStatus.SKIPPED,
      },
      relations: ['feedbacks'],
    });
  }
}
