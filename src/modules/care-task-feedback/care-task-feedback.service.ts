import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareTaskFeedback } from './entities/care-task-feedback.entity';
import { FeedbackAction } from './enums/feedbackAction.enum';
import { CreateTaskFeedbackDto } from './dto/create-task-feedback.dto';
import { CareTaskService } from '../care-task/care-task.services';
import { TaskStatus } from '../care-task/enums/taskStatus.enum';

@Injectable()
export class CareTaskFeedbackService {
  constructor(
    @InjectRepository(CareTaskFeedback)
    private readonly feedbackRepository: Repository<CareTaskFeedback>,
    private careTaskService: CareTaskService,
  ) {}

  async create(
    careTaskId: number,
    userId: number,
    action: FeedbackAction,
    reason: string,
    note?: string,
  ): Promise<CareTaskFeedback> {
    console.log("task task create")
    const taskUserId = await this.careTaskService.getTaskUserId(careTaskId);
    console.log("task taskUserId : ",taskUserId)
    console.log("task userId : ",userId)
    if (!taskUserId || taskUserId != userId) {
      throw new UnauthorizedException('شما فقط مجاز به ثبت رخدادهای دستگاه خود میباشید.');
    }
    const feedback = this.feedbackRepository.create({
      careTaskId,
      userId,
      action,
      reason, 
      note,
      createdAt: new Date(),
    });
    await this.careTaskService.updateStatus(careTaskId, TaskStatus.COMPLETED);
    return this.feedbackRepository.save(feedback);
  }

  async findByTask(careTaskId: number): Promise<CareTaskFeedback[]> {
    return this.feedbackRepository.find({
      where: { careTaskId },
      relations: ['user', 'careTask'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: number): Promise<CareTaskFeedback[]> {
    return this.feedbackRepository.find({
      where: { userId },
      relations: ['careTask'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByTaskAndUser(careTaskId: number, userId: number): Promise<CareTaskFeedback[]> {
    return this.feedbackRepository.find({
      where: { careTaskId, userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByAction(action: FeedbackAction): Promise<CareTaskFeedback[]> {
    return this.feedbackRepository.find({
      where: { action },
      relations: ['careTask', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CareTaskFeedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['careTask', 'user'],
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    return feedback;
  }

  async updateNote(id: number, note: string): Promise<CareTaskFeedback> {
    const feedback = await this.findOne(id);
    feedback.note = note;
    return this.feedbackRepository.save(feedback);
  }

  async delete(id: number): Promise<void> {
    const result = await this.feedbackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
  }

  async getTaskFeedbackStats(careTaskId: number) {
    const feedbacks = await this.findByTask(careTaskId);

    const stats = {
      total: feedbacks.length,
      completed: feedbacks.filter((f) => f.action === FeedbackAction.COMPLETED).length,
      skipped: feedbacks.filter((f) => f.action === FeedbackAction.SKIPPED).length,
      byAction: {} as Record<FeedbackAction, number>,
    };

    feedbacks.forEach((f) => {
      stats.byAction[f.action] = (stats.byAction[f.action] || 0) + 1;
    });

    return stats;
  }

  async getUserFeedbackStats(userId: number) {
    const feedbacks = await this.findByUser(userId);

    const stats = {
      total: feedbacks.length,
      completed: feedbacks.filter((f) => f.action === FeedbackAction.COMPLETED).length,
      skipped: feedbacks.filter((f) => f.action === FeedbackAction.SKIPPED).length,
      byAction: {} as Record<FeedbackAction, number>,
    };

    feedbacks.forEach((f) => {
      stats.byAction[f.action] = (stats.byAction[f.action] || 0) + 1;
    });

    return stats;
  }
}
