export declare enum ChartRange {
    SEVEN_DAYS = "7d",
    THIRTY_DAYS = "30d",
    NINETY_DAYS = "90d"
}
export declare enum ChartInterval {
    HOURLY = "hourly",
    DAILY = "daily",
    WEEKLY = "weekly"
}
export declare class ChartQueryDto {
    range?: ChartRange;
    interval?: ChartInterval;
}
