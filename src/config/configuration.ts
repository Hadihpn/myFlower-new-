export default () => ({
  port: parseInt(process.env.PORT||"3000", 10) ,
  nodeEnv: process.env.NODE_ENV || 'development',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT||"5432", 10),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres123',
    database: process.env.DATABASE_NAME || 'plant_monitoring',
    synchronize: process.env.DATABASE_SYNC === 'true',
    logging: process.env.DATABASE_LOGGING === 'true',
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRATION || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d',
  },
  
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL ||"60", 10) ,
    limit: parseInt(process.env.THROTTLE_LIMIT ||"100", 10) ,
  },
  
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT||"587", 10), //should checked
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM || 'noreply@plantmonitor.com',
  },
  
  zarinpal: {
    merchantId: process.env.ZARINPAL_MERCHANT_ID,
    sandbox: process.env.ZARINPAL_SANDBOX === 'true',
    callbackUrl: process.env.ZARINPAL_CALLBACK_URL,
  },
  
  upload: {
    path: process.env.UPLOAD_PATH || './uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "5242880", 10) ,
    allowedTypes: process.env.ALLOWED_IMAGE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png',
      'image/jpg',
    ],
  },
  
  sensor: {
    readingInterval: parseInt(process.env.SENSOR_READING_INTERVAL || "15", 10) ,
    suddenChange: {
      temperature: parseInt(process.env.SUDDEN_CHANGE_THRESHOLD_TEMP||"10", 10) ,
      moisture: parseInt(process.env.SUDDEN_CHANGE_THRESHOLD_MOISTURE || "20", 10) ,
      light: parseInt(process.env.SUDDEN_CHANGE_THRESHOLD_LIGHT || "5000", 10) ,
    },
    verificationTimeout: parseInt(process.env.VERIFICATION_TIMEOUT_MINUTES || "5", 10),
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    dir: process.env.LOG_DIR || './logs',
  },
});