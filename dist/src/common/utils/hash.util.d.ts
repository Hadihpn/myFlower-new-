export declare class HashUtil {
    private static readonly SALT_ROUNDS;
    static hash(plainText: string): Promise<string>;
    static compare(plainText: string, hash: string): Promise<boolean>;
    static generateRandomToken(length?: number): string;
}
