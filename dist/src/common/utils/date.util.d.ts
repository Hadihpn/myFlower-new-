export declare class DateUtil {
    static getStartOfDay(date?: Date): Date;
    static getEndOfDay(date?: Date): Date;
    static addDays(date: Date, days: number): Date;
    static addMinutes(date: Date, minutes: number): Date;
    static getDaysBetween(date1: Date, date2: Date): number;
    static isToday(date: Date): boolean;
    static formatDate(date: Date, format?: string): string;
}
