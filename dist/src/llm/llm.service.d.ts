export declare class LlmService {
    private openai;
    constructor();
    getChatCompletion(prompt: string): Promise<string>;
}
