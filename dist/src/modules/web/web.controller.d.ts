import { Request, Response } from 'express';
export declare class WebController {
    getLoginPage(req: Request, res: Response): void | {
        title: string;
        success: string;
        error: string;
        email: string | import("qs").ParsedQs | (string | import("qs").ParsedQs)[];
    };
    getRegisterPage(req: Request, res: Response): void | {
        title: string;
    };
    getDashboard(req: Request): {
        title: string;
        user: Express.User;
    };
    landing(req: any): {
        title: string;
        user: any;
    };
    test(): string;
}
