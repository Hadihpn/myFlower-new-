export interface ZarinpalRequestResponse {
    data: {
        code: number;
        message: string;
        authority: string;
    };
    errors: any[];
}
export interface ZarinpalVerifyResponse {
    data: {
        code: number;
        message: string;
        card_hash: string;
        card_pan: string;
        ref_id: number;
        fee_type: string;
        fee: number;
    };
    errors: any[];
}
