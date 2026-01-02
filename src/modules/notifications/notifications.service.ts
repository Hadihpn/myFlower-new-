import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // this.transporter = nodemailer.createTransport({
    //   host: this.configService.get<string>('email.host'),
    //   port: this.configService.get<number>('email.port'),
    //   secure: this.configService.get<boolean>('email.secure'),
    //   auth: {
    //     user: this.configService.get<string>('email.user'),
    //     pass: this.configService.get<string>('email.password'),
    //   },
    // });
    this.transporter = nodemailer.createTransport({
      host: 'smtp.c1.liara.email',
      port: 587,
      secure: false,
      auth: {
        user: 'adoring_mccarthy_9fga3o',
        pass: '88e41d01-468e-4f95-a6a9-e8a50400a93e',
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      console.log("sendemail")
      console.log(to,subject,html)
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
    deviceId: number,
    changeType: string,
    magnitude: number,
  ): Promise<void> {
    const html = `
      <h2>⚠️ Sudden Environmental Change Detected</h2>
      <p>Device ID: ${deviceId}</p>
      <p>Change Type: ${changeType}</p>
      <p>Magnitude: ${magnitude}</p>
      <p>Please check your plants immediately!</p>
    `;

    // In production, get user email from deviceId
    await this.sendEmail('user@example.com', 'Plant Alert: Sudden Change Detected', html);
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    // const html = `
    //   <h2>Welcome to Plant Monitoring System! 🌱</h2>
    //   <p>Hi ${name},</p>
    //   <p>Thank you for joining our plant monitoring community!</p>
    //   <p>Get started by connecting your IoT device and selecting your plants.</p>
    // `;

    // -------------------
    const templatePath = path.join(__dirname, 'templates', 'welcome.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    const html = template({
      name,
      appUrl: this.configService.get('appUrl'),
    });

    await this.sendEmail(email, '🌱 Welcome to Plant Monitoring System!', html);
    // await this.transporter.sendMail({
    //   to: email,
    //   subject: '🌱 Welcome to Plant Monitoring System!',
    //   html,
    // });
  }
  async sendThresholdAlert(email: string, name: string, messages: string[]): Promise<void> {
    // const html = `
    //     <h2 color="red">Pay attention please🌱</h2>
    //     <p>Hi ${name},</p>
    //     <p>We are detected an unsuitable condition for your plants</p>
    //     <p>${message}</p>
    //   `;

    // -------------------
    const templatePath = path.join(__dirname, 'templates', 'unsuiteCondition.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    ``;
    const html = template({
      title: 'Unsuitable Condition Alert',
      name,
      messages,
      signature: 'The MyFlower Team',
      appUrl: this.configService.get('appUrl'),
    });
    await this.sendEmail(email, 'Unsuitable condition', html);
    // await this.transporter.sendMail({
    //   to: email,
    //   subject: '🌱 Welcome to Plant Monitoring System!',
    //   html,
    // });
  }
}
