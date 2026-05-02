"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ormconfig_1 = require("../../../ormconfig");
async function seedSensorReadings() {
    const dataSource = new typeorm_1.DataSource(ormconfig_1.default.options);
    await dataSource.initialize();
    console.log('🌱 Starting sensor readings seeding...');
    try {
        const devices = await dataSource.query(`SELECT device_id FROM devices LIMIT 3`);
        if (devices.length === 0) {
            console.log('⚠️  No devices found. Please seed devices first.');
            return;
        }
        console.log(`📡 Found ${devices.length} device(s)`);
        for (const device of devices) {
            const deviceId = device.device_id;
            for (let i = 0; i < 30; i++) {
                const hoursAgo = i * 0.5;
                const temperature = (18 + Math.random() * 12).toFixed(1);
                const moisture = (30 + Math.random() * 40).toFixed(1);
                const light = (200 + Math.random() * 800).toFixed(0);
                const humidity = (40 + Math.random() * 40).toFixed(1);
                const verified = Math.random() > 0.2;
                const anomaly = Math.random() > 0.9;
                await dataSource.query(`
          INSERT INTO sensor_readings (
            device_id, temperature, moisture, light, humidity, 
            timestamp, verified, anomaly, created_at
          )
          VALUES (
            '${deviceId}',
            ${temperature},
            ${moisture},
            ${light},
            ${humidity},
            NOW() + INTERVAL '${hoursAgo} hours',
            ${verified},
            ${anomaly},
            NOW()
          )
          ON CONFLICT DO NOTHING;
        `);
            }
            console.log(`✅ Created 10 readings for device ${deviceId}`);
        }
        console.log('🎉 Sensor readings seeding completed!');
        console.log(`📊 Total readings: ${devices.length * 10}`);
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
    finally {
        await dataSource.destroy();
    }
}
seedSensorReadings()
    .then(() => {
    console.log('✅ Seed script completed');
    process.exit(0);
})
    .catch((error) => {
    console.error('❌ Seed script failed:', error);
    process.exit(1);
});
//# sourceMappingURL=sensor-readings-seed.js.map