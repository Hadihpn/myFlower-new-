"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarePlansTable1700000000018 = void 0;
const typeorm_1 = require("typeorm");
class CreateCarePlansTable1700000000018 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'care_plans',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'device_id',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'plant_species_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'watering_frequency_days',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'fertilizing_frequency_days',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'fertilizer_schedule',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'pesticide_schedule',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'skip_count',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['active', 'replaced', 'archived'],
                    default: "'active'",
                },
                {
                    name: 'notes',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'replaced_by_plan_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createIndex('care_plans', new typeorm_1.TableIndex({
            name: 'IDX_care_plans_user_device_status',
            columnNames: ['user_id', 'device_id', 'status'],
        }));
        await queryRunner.createIndex('care_plans', new typeorm_1.TableIndex({
            name: 'IDX_care_plans_plant_status',
            columnNames: ['plant_species_id', 'status'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('care_plans');
    }
}
exports.CreateCarePlansTable1700000000018 = CreateCarePlansTable1700000000018;
//# sourceMappingURL=1700000000020-CreateCarePlansTable.js.map