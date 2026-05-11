// src/database/seeds/sensor-readings-seed.ts
import { DataSource } from 'typeorm';
import ormconfig from '../../../ormconfig';

async function seedSensorReadings() {
  const dataSource = new DataSource(ormconfig.options);
  await dataSource.initialize();

  console.log('🌱 Starting sensor readings seeding...');

  try {
    // بررسی وجود device‌ها
    const devices = await dataSource.query(`SELECT device_id FROM devices LIMIT 3`);

    if (devices.length === 0) {
      console.log('⚠️  No devices found. Please seed devices first.');
      return;
    }

    console.log(`📡 Found ${devices.length} device(s)`);

    // تولید 10 خوانش برای هر device در 24 ساعت گذشته
    for (const device of devices) {
      const deviceId = device.device_id;

      // 7 روز
      for (let day = 0; day < 7; day++) {
        // 30 رکورد در هر روز
        for (let i = 0; i < 30; i++) {
          const hoursAgo = day * 24 + i * 0.5; // روز + هر نیم ساعت

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
          NOW() - INTERVAL '${hoursAgo} hours',
          ${verified},
          ${anomaly},
          NOW()
        )
        ON CONFLICT DO NOTHING;
      `);
        }
      }

      console.log(`✅ Created readings for 7 days for device ${deviceId}`);
    }
    console.log('🎉 Sensor readings seeding completed!');
    console.log(`📊 Total readings: ${devices.length * 10}`);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
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
