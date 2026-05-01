// const html = `
//   <h2>⚠️ Sudden Environmental Change Detected</h2>
//   <p>Device ID: ${deviceId}</p>
//   <p>Change Type: ${changeType}</p>
//   <p>Magnitude: ${magnitude}</p>
//   <p>Please check your plants immediately!</p>
// `;
// this.transporter = nodemailer.createTransport({
//   host: 'smtp.c1.liara.email',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'adoring_mccarthy_9fga3o',
//     pass: '88e41d01-468e-4f95-a6a9-e8a50400a93e',
//   },
// });
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { NotificationSettings } from './entities/notification-settings.entity';
import { DevicesService } from '../devices/devices.service';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    private devicesService: DevicesService,
    @InjectRepository(NotificationSettings)
    private settingsRepository: Repository<NotificationSettings>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('email.host'),
      port: this.configService.get<number>('email.port'),
      secure: this.configService.get<boolean>('email.secure', false),
      auth: {
        user: this.configService.get<string>('email.user'),
        pass: this.configService.get<string>('email.pass'),
      },
    });
  }

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

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      console.log('sendemail', { to, subject, html });
      await this.transporter.sendMail({
        from: this.configService.get<string>('email.from'),
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
}
