"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const ormconfig_1 = require("../../../ormconfig");
async function seed() {
    const dataSource = new typeorm_1.DataSource(ormconfig_1.default.options);
    await dataSource.initialize();
    console.log('🌱 Starting database seeding...');
    try {
        await dataSource.query(`
      INSERT INTO users (email, password, full_name, phone_number, role, created_at, updated_at)
      VALUES 
        ('admin@plantmonitor.com', '${await bcrypt.hash('admin123', 10)}', 'Admin User', '+1234567890', 'admin', NOW(), NOW()),
        ('user@example.com', '${await bcrypt.hash('password123', 10)}', 'Test User', '+1234567891', 'user', NOW(), NOW())
      ON CONFLICT (email) DO NOTHING;
    `);
        console.log('✅ Users created');
        await dataSource.query(`
      INSERT INTO subscription_tiers (name, plant_slot_limit, price, billing_cycle, features, active, created_at)
      VALUES 
        ('Bronze', 3, 5.00, 'monthly', '{"support": "Email", "analytics": false}', true, NOW()),
        ('Silver', 6, 10.00, 'monthly', '{"support": "Priority Email", "analytics": true}', true, NOW()),
        ('Gold', 10, 15.00, 'monthly', '{"support": "24/7", "analytics": true, "premium": true}', true, NOW())
      ON CONFLICT DO NOTHING;
    `);
        console.log('✅ Subscription tiers created');
        await dataSource.query(`
      INSERT INTO plant_groups (name, description, category, difficulty, thresholds, care_instructions, active, created_at)
      VALUES 
        (
          'Mediterranean Herbs',
          'Herbs that thrive in warm, sunny conditions with well-drained soil',
          'Herbs',
          'Easy',
          '{"temperature": {"min": 15, "max": 30, "ideal": {"min": 18, "max": 25}}, "moisture": {"min": 40, "max": 70, "ideal": {"min": 50, "max": 65}}, "light": {"min": 20000, "max": 50000, "ideal": {"min": 25000, "max": 40000}}}',
          '{"watering": "Regular, allow soil to dry between waterings", "sunlight": "Full sun to partial shade", "soil": "Well-drained"}',
          true,
          NOW()
        ),
        (
          'Tropical Plants',
          'Plants that prefer warm, humid environments',
          'Flowers',
          'Medium',
          '{"temperature": {"min": 18, "max": 32, "ideal": {"min": 22, "max": 28}}, "moisture": {"min": 60, "max": 85, "ideal": {"min": 65, "max": 80}}, "light": {"min": 15000, "max": 35000, "ideal": {"min": 20000, "max": 30000}}}',
          '{"watering": "Keep soil consistently moist", "sunlight": "Bright indirect light", "soil": "Rich, well-draining"}',
          true,
          NOW()
        )
      ON CONFLICT DO NOTHING;
    `);
        console.log('✅ Plant groups created');
        await dataSource.query(`
      INSERT INTO plant_species (
        group_id, name, scientific_name, common_names, category, difficulty,
        thresholds, watering, fertilization, growth_info, harvest_info,
        common_problems, companion_plants, avoid_plants, toxicity, tips, active, created_at
      )
      VALUES 
        (
          1,
          'Basil',
          'Ocimum basilicum',
          'Sweet Basil,Thai Basil,Genovese Basil',
          'Herbs',
          'Easy',
          '{"temperature": {"min": 18, "max": 27, "ideal": {"min": 20, "max": 25}}, "moisture": {"min": 50, "max": 70, "ideal": {"min": 55, "max": 65}}, "light": {"min": 25000, "max": 45000, "ideal": {"min": 30000, "max": 40000}}}',
          '{"frequency": "Every 2-3 days", "amount": "Moderate", "method": "Soil watering"}',
          '{"frequency": "Every 2 weeks", "type": "Balanced liquid fertilizer"}',
          '{"height": "30-60cm", "spread": "20-30cm", "growthRate": "Fast"}',
          '{"time": "60-90 days", "method": "Cut leaves as needed"}',
          '[{"problem": "Aphids", "solution": "Spray with neem oil"}, {"problem": "Powdery mildew", "solution": "Improve air circulation"}]',
          'Tomatoes,Peppers',
          'Rue,Sage',
          '{"pets": "Safe", "humans": "Safe"}',
          'Pinch tips for bushier growth,Harvest before flowering,Remove flower buds',
          true,
          NOW()
        ),
        (
          1,
          'Rosemary',
          'Rosmarinus officinalis',
          'Common Rosemary,Garden Rosemary',
          'Herbs',
          'Easy',
          '{"temperature": {"min": 10, "max": 30, "ideal": {"min": 15, "max": 25}}, "moisture": {"min": 30, "max": 60, "ideal": {"min": 40, "max": 50}}, "light": {"min": 30000, "max": 50000, "ideal": {"min": 35000, "max": 45000}}}',
          '{"frequency": "Every 4-5 days", "amount": "Light", "method": "Soil watering"}',
          '{"frequency": "Every month", "type": "Balanced fertilizer"}',
          '{"height": "60-120cm", "spread": "60-90cm", "growthRate": "Slow"}',
          '{"time": "Year-round", "method": "Cut sprigs as needed"}',
          '[{"problem": "Root rot", "solution": "Ensure good drainage"}, {"problem": "Powdery mildew", "solution": "Reduce humidity"}]',
          'Sage,Thyme,Oregano',
          'Basil',
          '{"pets": "Toxic to dogs", "humans": "Safe"}',
          'Prune regularly to encourage bushy growth,Drought tolerant once established',
          true,
          NOW()
        ),
        (
          1,
          'Thyme',
          'Thymus vulgaris',
          'Common Thyme,Garden Thyme',
          'Herbs',
          'Easy',
          '{"temperature": {"min": 10, "max": 28, "ideal": {"min": 15, "max": 24}}, "moisture": {"min": 35, "max": 65, "ideal": {"min": 45, "max": 55}}, "light": {"min": 25000, "max": 45000, "ideal": {"min": 30000, "max": 40000}}}',
          '{"frequency": "Every 3-4 days", "amount": "Moderate", "method": "Soil watering"}',
          '{"frequency": "Every 3 weeks", "type": "Light liquid fertilizer"}',
          '{"height": "15-30cm", "spread": "30-45cm", "growthRate": "Medium"}',
          '{"time": "Year-round", "method": "Cut stems as needed"}',
          '[{"problem": "Root rot", "solution": "Improve drainage"}, {"problem": "Spider mites", "solution": "Spray with water"}]',
          'Rosemary,Oregano,Lavender',
          'None',
          '{"pets": "Safe", "humans": "Safe"}',
          'Trim after flowering,Very drought tolerant,Low maintenance',
          true,
          NOW()
        )
      ON CONFLICT DO NOTHING;
    `);
        console.log('✅ Plant species created');
        await dataSource.query(`
      INSERT INTO plant_packages (
        name, description, category, difficulty, plant_count,
        thresholds, price, popular, active, created_at
      )
      VALUES 
        (
          'Mediterranean Herb Garden',
          'A perfect collection of herbs for cooking - Basil, Rosemary, and Thyme',
          'Herbs',
          'Easy',
          3,
          '{"temperature": {"min": 15, "max": 30, "ideal": {"min": 18, "max": 25}}, "moisture": {"min": 40, "max": 70, "ideal": {"min": 50, "max": 65}}, "light": {"min": 25000, "max": 50000, "ideal": {"min": 30000, "max": 45000}}}',
          15.00,
          true,
          true,
          NOW()
        )
      ON CONFLICT DO NOTHING;
    `);
        console.log('✅ Plant packages created');
        await dataSource.query(`
      INSERT INTO plant_package_items (package_id, plant_species_id, position, created_at)
      SELECT 
        (SELECT id FROM plant_packages WHERE name = 'Mediterranean Herb Garden'),
        (SELECT id FROM plant_species WHERE name = 'Basil'),
        1,
        NOW()
      WHERE NOT EXISTS (
        SELECT 1 FROM plant_package_items 
        WHERE package_id = (SELECT id FROM plant_packages WHERE name = 'Mediterranean Herb Garden')
        AND plant_species_id = (SELECT id FROM plant_species WHERE name = 'Basil')
      );

      INSERT INTO plant_package_items (package_id, plant_species_id, position, created_at)
      SELECT 
        (SELECT id FROM plant_packages WHERE name = 'Mediterranean Herb Garden'),
        (SELECT id FROM plant_species WHERE name = 'Rosemary'),
        2,
        NOW()
      WHERE NOT EXISTS (
        SELECT 1 FROM plant_package_items 
        WHERE package_id = (SELECT id FROM plant_packages WHERE name = 'Mediterranean Herb Garden')
        AND plant_species_id = (SELECT id FROM plant_species WHERE name = 'Rosemary')
      );

      INSERT INTO plant_package_items (package_id, plant_species_id, position, created_at)
      SELECT 
        (SELECT id FROM plant_packages WHERE name = 'Mediterranean Herb Garden'),
        (SELECT id FROM plant_species WHERE name = 'Thyme'),
        3,
        NOW()
      WHERE NOT EXISTS (
        SELECT 1 FROM plant_package_items 
        WHERE package_id = (SELECT id FROM plant_packages WHERE name = 'Mediterranean Herb Garden')
        AND plant_species_id = (SELECT id FROM plant_species WHERE name = 'Thyme')
      );
    `);
        console.log('✅ Package items linked');
        console.log('🎉 Seeding completed successfully!');
        console.log('');
        console.log('📝 Default credentials:');
        console.log('   Admin: admin@plantmonitor.com / admin123');
        console.log('   User:  user@example.com / password123');
        console.log('');
        console.log('💎 Subscription Tiers: Bronze (3 slots), Silver (6 slots), Gold (10 slots)');
        console.log('🌱 Plant Species: Basil, Rosemary, Thyme');
        console.log('📦 Plant Packages: Mediterranean Herb Garden (3 plants)');
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
    finally {
        await dataSource.destroy();
    }
}
seed()
    .then(() => {
    console.log('✅ Seed script completed');
    process.exit(0);
})
    .catch((error) => {
    console.error('❌ Seed script failed:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map