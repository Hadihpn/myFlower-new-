import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UserPlantSelection } from '@/modules/user-plant-selections/entities/user-plant-selection.entity';
import OpenAI from 'openai';

interface AiTaskResponse {
  taskType: string;
  scheduledDate: string;
  instructions: string;
  optimalTime?: string;
  shopProductType?: string;
}

interface AiCarePlanResponse {
  tasks: AiTaskResponse[];
  reasoning: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  // private readonly apiUrl = 'https://api.deepseek.com/v1/chat/completions';
  private readonly apiKey: string;
  private readonly openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: this.configService.get<string>('OPENROUTER_API_KEY'),
      timeout: 60000,
      defaultHeaders: {
        // 'HTTP-Referer': 'https://your-app-domain.com', // اختیاری: برای داشبورد OpenRouter
        'X-Title': 'PlantCareApp', // اختیاری: نام برنامه شما
      },
    });
  }

  async generateCarePlan(
    userPlantSelection: UserPlantSelection,
    sensorSnapshot: Record<string, any>,
    skipFeedback?: string,
  ): Promise<AiCarePlanResponse> {
    try {
      console.log('generateCarePlan');
      console.log("userPlantSelection :",userPlantSelection)
      console.log("sensorSnapshot :",sensorSnapshot)
      console.log("skipFeedback :",skipFeedback)
      const prompt = this.buildPrompt(userPlantSelection, sensorSnapshot, skipFeedback);

      console.log('prompt', prompt);
      // const response = await axios.post(
      //   this.apiUrl,
      //   {
      //     model: 'deepseek-chat',
      //     messages: [
      //       {
      //         role: 'system',
      //         content:
      //           'You are an expert plant care advisor. Generate a 28-day care plan in JSON format.',
      //       },
      //       {
      //         role: 'user',
      //         content: prompt,
      //       },
      //     ],
      //     temperature: 0.7,
      //     max_tokens: 2000,
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${this.apiKey}`,
      //     },
      //     timeout: 30000,
      //   },
      // );
      try {
        const completion = await this.openai.chat.completions.create({
          model: process.env.AI_MODEL, // در OpenRouter معمولا به این صورت نام‌گذاری می‌شود
          // model: 'openrouter/owl-alpha', // در OpenRouter معمولا به این صورت نام‌گذاری می‌شود
          // model: 'baidu/cobuddy:free', // در OpenRouter معمولا به این صورت نام‌گذاری می‌شود
          // model: 'bgoogle/gemma-4-26b-a4b-it:free', // در OpenRouter معمولا به این صورت نام‌گذاری می‌شود
          // model: 'minimax/minimax-m2.5:free', // در OpenRouter معمولا به این صورت نام‌گذاری می‌شود
          messages: [
            {
              role: 'system',
              content:
                'You are an expert plant care advisor. Generate a 28-day care plan in JSON format.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
          // توجه: در OpenRouter نیازی به ارسال دستی هدرها در هر درخواست نیست
        });
        console.log('completion : ', completion);
        const content = completion.choices[0].message.content;
        console.log('content : ', content);
        const parsed =await this.parseAiResponse(content);
        this.logger.log(`AI plan generated for selection ${userPlantSelection.id}`);
        return parsed;
      } catch (error) {
        throw new Error('AI service unavailable');
      }
    } catch (error) {
      this.logger.error('AI service failed', error);
      throw new Error('AI service unavailable');
    }
  }

  private buildPrompt(
    selection: UserPlantSelection,
    sensorSnapshot: Record<string, any>,
    skipFeedback?: string,
  ): string {
    const plantName = selection.plantSpecies?.name || selection.package?.name || 'Unknown plant';
    const deviceName = selection.device?.name || 'Device';

    let prompt = `Generate a 28-day care plan (in persian )for:
- Plant: ${plantName}
- Device: ${deviceName}
- Planted Date: ${selection.plantedDate}

Sensor Data (last 7 days average):
- Temperature: ${sensorSnapshot.avgTemperature || 'N/A'}°C
- Humidity: ${sensorSnapshot.avgHumidity || 'N/A'}%
- Soil Moisture: ${sensorSnapshot.avgSoilMoisture || 'N/A'}%
- Light: ${sensorSnapshot.avgLight || 'N/A'} lux

`;

    if (skipFeedback) {
      prompt += `User Feedback: ${skipFeedback}\n\n`;
    }

    prompt += `Return ONLY valid JSON in this exact format:
{
  "tasks": [
    {
      "taskType": "watering|fertilizing|pesticide|light_adjustment|pruning",
      "scheduledDate": "YYYY-MM-DD",
      "instructions": "detailed instructions",
      "optimalTime": "morning|afternoon|evening",
      "shopProductType": "nitrogen_fertilizer|potassium_fertilizer|pesticide|pruning_tool"
    }
  ],
  "reasoning": "brief explanation"
}

Rules:
- scheduledDate must be within next 28 days from today
- taskType must be one of: watering, fertilizing, pesticide, light_adjustment, pruning
- optimalTime is optional
- shopProductType is optional, use only if product recommendation needed
- Return 5-15 tasks spread across 28 days`;

    return prompt;
  }

  private parseAiResponse(content: string): AiCarePlanResponse {
    try {
      console.log("parseAiResponse", content)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
      }
      const parsed = JSON.parse(jsonMatch[0]);
      console.log("parsed JSON ai response", parsed)
      if (!parsed.tasks || !Array.isArray(parsed.tasks)) {
        throw new Error('Invalid AI response structure');
      }

      return {
        tasks: parsed.tasks.map((task: any) => ({
          taskType: task.taskType,
          scheduledDate: task.scheduledDate,
          instructions: task.instructions || '',
          optimalTime: task.optimalTime || null,
          shopProductType: task.shopProductType || null,
        })),
        reasoning: parsed.reasoning || '',
      };
    } catch (error) {
      this.logger.error('Failed to parse AI response', error);
      throw new Error('Invalid AI response format');
    }
  }
}
