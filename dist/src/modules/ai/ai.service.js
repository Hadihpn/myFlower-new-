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
const openai_1 = require("openai");
let AiService = AiService_1 = class AiService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AiService_1.name);
        this.openai = new openai_1.default({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: this.configService.get('OPENROUTER_API_KEY'),
            timeout: 60000,
            defaultHeaders: {
                'X-Title': 'PlantCareApp',
            },
        });
    }
    async generateCarePlan(userPlantSelection, sensorSnapshot, skipFeedback) {
        try {
            console.log('generateCarePlan');
            console.log("userPlantSelection :", userPlantSelection);
            console.log("sensorSnapshot :", sensorSnapshot);
            console.log("skipFeedback :", skipFeedback);
            const prompt = this.buildPrompt(userPlantSelection, sensorSnapshot, skipFeedback);
            console.log('prompt', prompt);
            try {
                const completion = await this.openai.chat.completions.create({
                    model: process.env.AI_MODEL,
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an expert plant care advisor. Generate a 28-day care plan in JSON format.',
                        },
                        {
                            role: 'user',
                            content: prompt,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 2000,
                });
                console.log('completion : ', completion);
                const content = completion.choices[0].message.content;
                console.log('content : ', content);
                const parsed = await this.parseAiResponse(content);
                this.logger.log(`AI plan generated for selection ${userPlantSelection.id}`);
                return parsed;
            }
            catch (error) {
                throw new Error('AI service unavailable');
            }
        }
        catch (error) {
            this.logger.error('AI service failed', error);
            throw new Error('AI service unavailable');
        }
    }
    buildPrompt(selection, sensorSnapshot, skipFeedback) {
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
    parseAiResponse(content) {
        try {
            console.log("parseAiResponse", content);
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in AI response');
            }
            const parsed = JSON.parse(jsonMatch[0]);
            console.log("parsed JSON ai response", parsed);
            if (!parsed.tasks || !Array.isArray(parsed.tasks)) {
                throw new Error('Invalid AI response structure');
            }
            return {
                tasks: parsed.tasks.map((task) => ({
                    taskType: task.taskType,
                    scheduledDate: task.scheduledDate,
                    instructions: task.instructions || '',
                    optimalTime: task.optimalTime || null,
                    shopProductType: task.shopProductType || null,
                })),
                reasoning: parsed.reasoning || '',
            };
        }
        catch (error) {
            this.logger.error('Failed to parse AI response', error);
            throw new Error('Invalid AI response format');
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map