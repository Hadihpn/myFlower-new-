import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  max_tokens?: number;
  temperature?: number;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface CareScheduleInput {
  plantSpeciesId: number;
  sensorData: any[];
  userId: number;
  deviceId: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly apiKey: string;
  private readonly apiUrl = 'https://api.deepseek.com/v1/chat/completions';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('DEEPSEEK_API_KEY');
    if (!this.apiKey) {
      this.logger.warn('DEEPSEEK_API_KEY is not set in environment variables');
    }
  }

  /**
   * تولید برنامه مراقبت با استفاده از DeepSeek AI
   */
  async generateCareSchedule(input: CareScheduleInput): Promise<string> {
    if (!this.apiKey) {
      throw new Error('DeepSeek API key is not configured');
    }

    // ساخت prompt از داده‌های ورودی
    const prompt = this.buildCareSchedulePrompt(input);

    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    const data: DeepSeekRequest = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are an expert plant care assistant. Generate personalized care schedules based on sensor data and plant species information. Return structured JSON with care tasks including: task type (watering/fertilizing/pruning), frequency, optimal time, and specific instructions based on current sensor readings.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post<DeepSeekResponse>(this.apiUrl, data, { headers }),
      );

      const content = response.data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('Empty response from DeepSeek API');
      }

      // لاگ استفاده از توکن‌ها برای مدیریت هزینه
      if (response.data.usage) {
        this.logger.log(
          `DeepSeek API usage - Tokens: ${response.data.usage.total_tokens} ` +
          `(prompt: ${response.data.usage.prompt_tokens}, completion: ${response.data.usage.completion_tokens})`,
        );
      }

      return content;
    } catch (error) {
      this.logger.error('Error calling DeepSeek API:', error.response?.data || error.message);
      throw new Error('Failed to generate AI-based care schedule');
    }
  }

  /**
   * ساخت prompt برای تولید برنامه مراقبت
   */
  private buildCareSchedulePrompt(input: CareScheduleInput): string {
    const { plantSpeciesId, sensorData, userId, deviceId } = input;

    // محاسبه میانگین‌های سنسور
    const avgTemp = sensorData.length > 0
      ? (sensorData.reduce((sum, r) => sum + (r.temperature || 0), 0) / sensorData.length).toFixed(1)
      : 'N/A';
    
    const avgHumidity = sensorData.length > 0
      ? (sensorData.reduce((sum, r) => sum + (r.humidity || 0), 0) / sensorData.length).toFixed(1)
      : 'N/A';
    
    const avgSoilMoisture = sensorData.length > 0
      ? (sensorData.reduce((sum, r) => sum + (r.soilMoisture || 0), 0) / sensorData.length).toFixed(1)
      : 'N/A';

    const avgLight = sensorData.length > 0
      ? (sensorData.reduce((sum, r) => sum + (r.lightLevel || 0), 0) / sensorData.length).toFixed(0)
      : 'N/A';

    return `
Generate a personalized plant care schedule based on the following data:

**Plant Species ID**: ${plantSpeciesId}
**Device ID**: ${deviceId}
**User ID**: ${userId}

**Current Sensor Readings** (averages from last ${sensorData.length} readings):
- Temperature: ${avgTemp}°C
- Humidity: ${avgHumidity}%
- Soil Moisture: ${avgSoilMoisture}%
- Light Level: ${avgLight} lux

Please provide a JSON response with the following structure:
{
  "tasks": [
    {
      "type": "watering" | "fertilizing" | "pruning" | "light_adjustment",
      "frequency": "daily" | "weekly" | "biweekly" | "monthly",
      "optimalTime": "morning" | "afternoon" | "evening",
      "instructions": "specific instructions based on sensor data"
    }
  ],
  "recommendations": "general care recommendations based on current conditions"
}
`;
  }

  /**
   * تولید جدول داده با DeepSeek (متد عمومی)
   */
  async generateTable(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('DeepSeek API key is not configured');
    }

    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    const data: DeepSeekRequest = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates data as a markdown table.',
        },
        {
          role: 'user',
          content: `لطفاً داده‌های زیر را به صورت یک جدول Markdown منظم ارائه بده: ${prompt}`,
        },
      ],
      max_tokens: 1000,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post<DeepSeekResponse>(this.apiUrl, data, { headers }),
      );

      return response.data.choices[0]?.message?.content || '';
    } catch (error) {
      this.logger.error('Error calling DeepSeek API:', error.response?.data || error.message);
      throw new Error('Failed to process data with DeepSeek');
    }
  }
}
