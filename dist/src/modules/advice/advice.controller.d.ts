import { AdviceService } from './advice.service';
export declare class AdviceController {
    private readonly adviceService;
    constructor(adviceService: AdviceService);
    getAdviceForSelection(userId: number, selectionId: number): Promise<import("./dto/advice-response.dto").AdviceResponseDto>;
}
