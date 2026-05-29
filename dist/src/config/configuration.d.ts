declare const _default: () => {
    port: number;
    nodeEnv: any;
    appUrl: any;
    database: {
        host: any;
        port: number;
        username: any;
        password: any;
        database: any;
        synchronize: boolean;
        logging: boolean;
    };
    jwt: {
        secret: any;
        expiresIn: any;
        refreshSecret: any;
        refreshExpiresIn: any;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
    email: {
        host: any;
        port: number;
        secure: boolean;
        user: any;
        password: any;
        from: any;
    };
    zarinpal: {
        merchantId: any;
        sandbox: boolean;
        callbackUrl: any;
    };
    upload: {
        path: any;
        maxFileSize: number;
        allowedTypes: any;
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
        level: any;
        dir: any;
    };
};
export default _default;
