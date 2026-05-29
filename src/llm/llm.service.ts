import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class LlmService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1', // آدرس پایه OpenRouter
      apiKey: process.env.OPENROUTER_API_KEY,
    });
  }

  async getChatCompletion(prompt: string) {
    const completion = await this.openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo', // یا هر مدل دیگری که در OpenRouter موجود است
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0].message.content;
  }
}
