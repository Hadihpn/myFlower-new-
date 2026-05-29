// src/notifications/notifications.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { NotificationSettings } from './entities/notification-settings.entity';
import { Notification } from './entities/notification.entity';
import { DevicesService } from '../devices/devices.service';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';
import { GetNotificationsQueryDto } from './dto/get-notifications-query.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    private devicesService: DevicesService,
    @InjectRepository(NotificationSettings)
    private settingsRepository: Repository<NotificationSettings>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {
    // this.transporter = nodemailer.createTransport({
    //   host: this.configService.get<string>('email.host'),
    //   port: this.configService.get<number>('email.port'),
    //   secure: this.configService.get<boolean>('email.secure', false),
    //   auth: {
    //     user: this.configService.get<string>('email.user'),
    //     pass: this.configService.get<string>('email.pass'),
    //   },
    // });

     this.transporter = nodemailer.createTransport({
      host:"smtp.c1.liara.email",
      port:587,
      secure:false,
      auth: {
        user: "loving_kowalevski_okuhtc",
        pass: "03d80178-0b6f-417c-aed2-e039ce166330",
      },
    });
  }

  // ==================== Settings Methods ====================
  async getSettings(userId: number): Promise<NotificationSettings> {
    let settings = await this.settingsRepository.findOne({
      where: { userId },
    });

    if (!settings) {
      settings = this.settingsRepository.create({
        userId,
        emailEnabled: true,
        suddenChangeAlerts: true,
        thresholdAlerts: true,
        welcomeEmails: true,
      });
      await this.settingsRepository.save(settings);
    }

    return settings;
  }

  async updateSettings(
    userId: number,
    updateDto: UpdateNotificationSettingsDto,
  ): Promise<NotificationSettings> {
    let settings = await this.settingsRepository.findOne({
      where: { userId },
    });

    if (!settings) {
      settings = this.settingsRepository.create({
        userId,
        ...updateDto,
      });
    } else {
      Object.assign(settings, updateDto);
    }

    return await this.settingsRepository.save(settings);
  }

  // ==================== Email Methods ====================
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      console.log('sendemail', { to, subject, html });
      console.log('from email', this.configService.get<string>('email.from'));
      await this.transporter.sendMail({
        // from: this.configService.get<string>('email.from'),
        from: process.env.EMAIL_FROM ,
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendSuddenChangeAlert(
    deviceId: string,
    changeType: string,
    magnitude: number,
  ): Promise<void> {
    const device = await this.devicesService.findDeviceByDeviceId(deviceId);
    if (!device) {
      throw new NotFoundException(`Device ${deviceId} not found`);
    }

    const settings = await this.settingsRepository.findOne({
      where: { userId: device.user.id },
      relations: ['user'],
    });

    if (!settings || !settings.emailEnabled || !settings.suddenChangeAlerts) {
      return;
    }

    const html = `
      <h2>⚠️ Sudden Environmental Change Detected</h2>
      <p>Device ID: ${deviceId}</p>
      <p>Change Type: ${changeType}</p>
      <p>Magnitude: ${magnitude}</p>
      <p>Please check your plants immediately!</p>
    `;

    await this.sendEmail(
      settings.user.email,
      'Plant Alert: Sudden Change Detected',
      html,
    );
  }

  async sendSensorAnomalyNotification(
    deviceId: string,
    messages: string[],
  ): Promise<void> {
    const device = await this.devicesService.findDeviceByDeviceId(deviceId);
    if (!device) {
      throw new NotFoundException(`Device ${deviceId} not found`);
    }

    const settings = await this.settingsRepository.findOne({
      where: { userId: device.user.id },
      relations: ['user'],
    });

    if (!settings || !settings.emailEnabled || !settings.thresholdAlerts) {
      return;
    }

    const messageList = messages.map((msg) => `<li>${msg}</li>`).join('');
    const html = `
      <h2>⚠️ Sensor Anomalies Detected</h2>
      <p>Device ID: ${deviceId}</p>
      <p>The following issues were detected:</p>
      <ul>${messageList}</ul>
      <p>Please check your plants!</p>
    `;

    await this.sendEmail(
      settings.user.email,
      'Plant Alert: Sensor Anomalies Detected',
      html,
    );
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const templatePath = path.join(__dirname, 'templates', 'welcome.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    const html = template({
      name,
      appUrl: this.configService.get('appUrl'),
    });

    await this.sendEmail(
      email,
      '🌱 Welcome to Plant Monitoring System!',
      html,
    );
  }

  async sendThresholdAlert(
    email: string,
    name: string,
    messages: string[],
  ): Promise<void> {
    const templatePath = path.join(
      __dirname,
      'templates',
      'unsuiteCondition.hbs',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    const html = template({
      title: 'Unsuitable Condition Alert',
      name,
      messages,
      signature: 'The MyFlower Team',
      appUrl: this.configService.get('appUrl'),
    });

    await this.sendEmail(email, 'Unsuitable condition', html);
  }

  // ==================== Notification Persistence Methods ====================

  /**
   * ایجاد یک notification جدید در دیتابیس
   */
  async createNotification(dto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      userId: dto.userId,
      deviceId: dto.deviceId || null,
      type: dto.type,
      message: dto.message,
      severity: dto.severity,
      isRead: false,
      readAt: null,
    });
    return await this.notificationRepository.save(notification);
  }

  /**
   * دریافت لیست notifications یک کاربر با pagination و فیلتر
   */
  async getNotifications(
    userId: string,
    query: GetNotificationsQueryDto,
  ): Promise<{
    data: NotificationResponseDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = 20, type, severity } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.userId = :userId', { userId })
      .orderBy('notification.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (type) {
      queryBuilder.andWhere('notification.type = :type', { type });
    }

    if (severity) {
      queryBuilder.andWhere('notification.severity = :severity', { severity });
    }

    const [notifications, total] = await queryBuilder.getManyAndCount();

    return {
      data: notifications.map(this.toResponseDto),
      total,
      page,
      limit,
    };
  }

  /**
   * دریافت تعداد notifications خوانده‌نشده
   */
  async getUnreadCount(userId: number): Promise<number> {
    return await this.notificationRepository.count({
      where: { userId, isRead: false },
    });
  }

  /**
   * دریافت لیست notifications خوانده‌نشده
   */
  async getUnreadNotifications(
    userId: number,
  ): Promise<NotificationResponseDto[]> {
    const notifications = await this.notificationRepository.find({
      where: { userId, isRead: false },
      order: { createdAt: 'DESC' },
      take: 50,
    });

    return notifications.map(this.toResponseDto);
  }

  /**
   * علامت‌گذاری یک notification به عنوان خوانده‌شده
   */
  async markAsRead(
    userId: number,
    notificationId: string,
  ): Promise<NotificationResponseDto> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (!notification.isRead) {
      notification.isRead = true;
      notification.readAt = new Date();
      await this.notificationRepository.save(notification);
    }

    return this.toResponseDto(notification);
  }

  /**
   * علامت‌گذاری همه notifications یک کاربر به عنوان خوانده‌شده
   */
  async markAllAsRead(userId: string): Promise<{ affected: number }> {
    const result = await this.notificationRepository
      .createQueryBuilder()
      .update(Notification)
      .set({ isRead: true, readAt: new Date() })
      .where('userId = :userId AND isRead = false', { userId })
      .execute();

    return { affected: result.affected || 0 };
  }

  /**
   * حذف یک notification
   */
  async deleteNotification(
    userId: number,
    notificationId: string,
  ): Promise<void> {
    const result = await this.notificationRepository.delete({
      id: notificationId,
      userId,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Notification not found');
    }
  }

  // ==================== Helper Methods ====================
  private toResponseDto(notification: Notification): NotificationResponseDto {
    return {
      id: notification.id,
      userId: notification.userId,
      deviceId: notification.deviceId,
      type: notification.type,
      message: notification.message,
      severity: notification.severity,
      isRead: notification.isRead,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  
}
