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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let LlmService = class LlmService {
    constructor() {
        this.openai = new openai_1.default({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY,
        });
    }
    async getChatCompletion(prompt) {
        const completion = await this.openai.chat.completions.create({
            model: 'openai/gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });
        return completion.choices[0].message.content;
    }
};
exports.LlmService = LlmService;
exports.LlmService = LlmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LlmService);
//# sourceMappingURL=llm.service.js.map