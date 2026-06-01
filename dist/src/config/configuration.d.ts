declare const _default: () => {
    port: number;
    nodeEnv: string;
    appUrl: string;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
    };
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
    email: {
        host: string;
        port: number;
        secure: boolean;
        user: string;
        password: string;
        from: string;
    };
    zarinpal: {
        merchantId: string;
        sandbox: boolean;
        callbackUrl: string;
    };
    upload: {
        path: string;
        maxFileSize: number;
        allowedTypes: string[];
    };
    sensor: {
        readingInterval: number;
        suddenChange: {
            temperature: number;
            moisture: number;
            light: number;
        };
        verificationTimeout: number;
    };
    logging: {
        level: string;
        dir: string;
    };
};
export default _default;
