🌱 Plant Monitoring System - Complete Setup Guide
A comprehensive IoT-based plant monitoring and care advice system built with NestJS, PostgreSQL, and TypeORM.
📋 Table of Contents

Features
Tech Stack
Prerequisites
Installation
Configuration
Database Setup
Running the Application
API Documentation
Testing
Project Structure
Module Overview


✨ Features
Phase 1 (MVP) - Completed

✅ User Authentication: JWT-based authentication with refresh tokens
✅ Subscription System: Bronze/Silver/Gold tiers with plant slot limits
✅ Payment Integration: ZarinPal sandbox for subscription payments
✅ Plant Catalog: Groups, species, and packages with image uploads
✅ IoT Device Management: Device registration with static token authentication
✅ Sensor Data Collection: Temperature, moisture, light, humidity readings
✅ Anomaly Detection: 3-reading verification for sudden environmental changes
✅ Plant Monitoring: Manual device switching between multiple plants
✅ Care Advice: AI-powered recommendations based on sensor data
✅ Action Logging: Track watering, fertilizing, pruning activities
✅ Email Notifications: SMTP alerts for emergencies
✅ Admin Panel: Dashboard and system management
✅ Daily Summaries: Performance-optimized historical data


🛠 Tech Stack

Backend: NestJS 10.x
Database: PostgreSQL 15
ORM: TypeORM 0.3.x
Authentication: Passport JWT
Validation: class-validator, class-transformer
File Upload: Multer
Email: Nodemailer
Logging: Winston
Rate Limiting: @nestjs/throttler
API Docs: Swagger/OpenAPI
Payment: ZarinPal (sandbox)
Containerization: Docker & Docker Compose


📦 Prerequisites

Node.js 18+ and npm
PostgreSQL 15+
Docker & Docker Compose (optional)
SMTP email account (Gmail, etc.)
ZarinPal merchant ID (sandbox)


🚀 Installation
1. Clone the Repository
bashgit clone <repository-url>
cd plant-monitoring-system
2. Install Dependencies
bashnpm install
3. Create Upload Directories
bashmkdir -p uploads/plants uploads/packages logs

⚙️ Configuration
1. Create Environment File
bashcp .env.example .env
2. Configure .env
env# Application
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres123
DATABASE_NAME=plant_monitoring
DATABASE_SYNC=false
DATABASE_LOGGING=true

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRATION=30d

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Plant Monitor <noreply@plantmonitor.com>

# ZarinPal (Sandbox)
ZARINPAL_MERCHANT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
ZARINPAL_SANDBOX=true
ZARINPAL_CALLBACK_URL=http://localhost:3000/api/payment/verify

# Sensor Configuration
SENSOR_READING_INTERVAL=15
SUDDEN_CHANGE_THRESHOLD_TEMP=10
SUDDEN_CHANGE_THRESHOLD_MOISTURE=20
SUDDEN_CHANGE_THRESHOLD_LIGHT=5000
VERIFICATION_TIMEOUT_MINUTES=5

# Logging
LOG_LEVEL=info
LOG_DIR=./logs

🗄️ Database Setup
Option 1: Using Docker
bashdocker-compose up -d postgres
Option 2: Manual PostgreSQL Setup
bash# Create database
createdb plant_monitoring

# Or using psql
psql -U postgres
CREATE DATABASE plant_monitoring;
\q
Run Migrations
bashnpm run migration:run
Seed Database
bashnpm run seed
Default Credentials:

Admin: admin@plantmonitor.com / admin123
User: user@example.com / password123

Subscription Tiers:

Bronze: 3 plant slots - $5/month
Silver: 6 plant slots - $10/month
Gold: 10 plant slots - $15/month


🏃 Running the Application
Development Mode
bashnpm run start:dev
Production Build
bashnpm run build
npm run start:prod
Using Docker
bashdocker-compose up --build
The API will be available at:

API: http://localhost:3000
Swagger Docs: http://localhost:3000/api/docs


📚 API Documentation
Swagger UI
Open http://localhost:3000/api/docs in your browser for interactive API documentation.
Authentication
Register User
bashPOST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phoneNumber": "+1234567890"
}
Login
bashPOST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
Device Registration
bashPOST /api/devices/register
Authorization: Bearer <JWT_TOKEN>
{
  "deviceId": "DEVICE_12345",
  "name": "Backyard Sensor",
  "location": "Backyard Garden"
}
Submit Sensor Reading
bashPOST /api/sensor-readings
Headers:
  x-device-id: DEVICE_12345
  x-device-token: <DEVICE_TOKEN>
{
  "temperature": 24.5,
  "moisture": 65.3,
  "light": 28000
}
Get Plant Advice
bashGET /api/advice/selection/:selectionId
Authorization: Bearer <JWT_TOKEN>

🧪 Testing
Run Unit Tests
bashnpm run test
Run E2E Tests
bashnpm run test:e2e
Test Coverage
bashnpm run test:cov

📁 Project Structure
plant-monitoring-system/
├── src/
│   ├── common/              # Shared utilities
│   │   ├── decorators/
│   │   ├── filters/         # Winston exception handlers
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── utils/
│   ├── config/              # Configuration files
│   ├── database/
│   │   ├── migrations/      # TypeORM migrations
│   │   └── seeds/           # Seed data scripts
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── subscription/
│   │   ├── payment/
│   │   ├── plants/
│   │   ├── devices/
│   │   ├── sensor-readings/
│   │   ├── sensor-verification/
│   │   ├── user-plant-selections/
│   │   ├── advice/
│   │   ├── user-actions/
│   │   ├── notifications/
│   │   ├── admin/
│   │   └── daily-summary/
│   ├── main.ts
│   └── app.module.ts
├── uploads/                 # File storage
├── logs/                    # Winston logs
├── test/                    # E2E tests
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── README.md

🎯 Module Overview
Auth Module

JWT authentication
Refresh tokens
Password management

Users Module

User registration
Profile management
Role-based access control

Subscription Module

Tier management (Bronze/Silver/Gold)
Plant slot limits
Subscription lifecycle

Payment Module

ZarinPal integration
Sandbox testing
Payment verification

Plants Module

Plant groups, species, packages
Image upload (Multer)
Threshold management

Devices Module

IoT device registration
Static token authentication
Device calibration

Sensor Readings Module

Data collection (temp/moisture/light)
Time-series queries
Daily statistics

Sensor Verification Module

Anomaly detection
3-reading verification
False alarm prevention

User Plant Selections Module

Plant monitoring setup
Manual device switching
Slot limit enforcement

Advice Module

Health score calculation
Care recommendations
Threshold comparison

User Actions Module

Care action logging
Watering/fertilizing tracking
History queries

Notifications Module

SMTP email alerts
Handlebars templates
Emergency notifications

Admin Module

Dashboard statistics
System health monitoring
User management

Daily Summary Module

Cron job aggregation
Performance optimization
Historical data


🔒 Security Features

JWT with refresh tokens
Bcrypt password hashing
Rate limiting (100 requests/minute)
Device token authentication
Role-based access control
Input validation (class-validator)
SQL injection prevention (TypeORM)


📊 Database Schema
14 tables with complete relationships:

users
subscription_tiers
user_subscriptions
payments
plant_groups
plant_species
plant_packages
plant_package_items
devices
sensor_readings
sensor_verifications
user_plant_selections
user_actions
daily_summaries


🐛 Troubleshooting
Database Connection Issues
bash# Check PostgreSQL is running
pg_isready

# Verify credentials in .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres123
Migration Errors
bash# Revert last migration
npm run migration:revert

# Re-run migrations
npm run migration:run
Port Already in Use
bash# Change port in .env
PORT=3001

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9

📝 Environment Variables Reference
VariableDescriptionDefaultNODE_ENVEnvironment modedevelopmentPORTApplication port3000DATABASE_HOSTPostgreSQL hostlocalhostDATABASE_PORTPostgreSQL port5432JWT_SECRETJWT signing secretRequiredEMAIL_HOSTSMTP serverRequiredZARINPAL_MERCHANT_IDPayment gateway IDRequired

🚀 Deployment
Production Checklist

 Set NODE_ENV=production
 Use strong JWT secrets
 Configure production database
 Set up real SMTP server
 Use production ZarinPal credentials
 Enable HTTPS
 Configure firewall rules
 Set up monitoring/logging
 Regular database backups


📄 License
MIT License

👥 Support
For issues and questions:

GitHub Issues: [Create an issue]
Email: support@plantmonitor.com
Documentation: http://localhost:3000/api/docs


🎉 Credits
Built with ❤️ using NestJS, PostgreSQL, and TypeORM

Happy Plant Monitoring! 🌿