export declare class ResponseDto<T> {
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
}
export declare class PaginatedResponseDto<T> extends ResponseDto<T> {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
