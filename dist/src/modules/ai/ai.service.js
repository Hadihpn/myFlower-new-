"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AiService = AiService_1 = class AiService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(AiService_1.name);
        this.apiUrl = 'https://api.deepseek.com/v1/chat/completions';
        this.apiKey = this.configService.get('DEEPSEEK_API_KEY');
        if (!this.apiKey) {
            this.logger.warn('DEEPSEEK_API_KEY is not set in environment variables');
        }
    }
    async generateCareSchedule(input) {
        if (!this.apiKey) {
            throw new Error('DeepSeek API key is not configured');
        }
        const prompt = this.buildCareSchedulePrompt(input);
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
        };
        const data = {
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
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(this.apiUrl, data, { headers }));
            const content = response.data.choices[0]?.message?.content;
            if (!content) {
                throw new Error('Empty response from DeepSeek API');
            }
            if (response.data.usage) {
                this.logger.log(`DeepSeek API usage - Tokens: ${response.data.usage.total_tokens} ` +
                    `(prompt: ${response.data.usage.prompt_tokens}, completion: ${response.data.usage.completion_tokens})`);
            }
            return content;
        }
        catch (error) {
            this.logger.error('Error calling DeepSeek API:', error.response?.data || error.message);
            throw new Error('Failed to generate AI-based care schedule');
        }
    }
    buildCareSchedulePrompt(input) {
        const { plantSpeciesId, sensorData, userId, deviceId } = input;
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
    async generateTable(prompt) {
        if (!this.apiKey) {
            throw new Error('DeepSeek API key is not configured');
        }
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
        };
        const data = {
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
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(this.apiUrl, data, { headers }));
            return response.data.choices[0]?.message?.content || '';
        }
        catch (error) {
            this.logger.error('Error calling DeepSeek API:', error.response?.data || error.message);
            throw new Error('Failed to process data with DeepSeek');
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map