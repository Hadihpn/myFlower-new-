"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCareSchedulesTable1700000000017 = void 0;
const typeorm_1 = require("typeorm");
class CreateCareSchedulesTable1700000000017 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TYPE care_schedules_schedule_type_enum AS ENUM ('ai_based', 'rule_based');
    `);
        await queryRunner.query(`
      CREATE TYPE care_schedules_status_enum AS ENUM ('pending', 'completed', 'skipped', 'overdue', 'active');
    `);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'care_schedules',
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
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'selection_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'schedule_type',
                    type: 'care_schedules_schedule_type_enum',
                    default: "'rule_based'",
                },
                {
                    name: 'status',
                    type: 'care_schedules_status_enum',
                    default: "'active'",
                },
                {
                    name: 'scheduled_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'last_ai_call_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'watering_frequency',
                    type: 'int',
                    isNullable: true,
                    comment: 'تعداد دفعات آبیاری در هفته',
                },
                {
                    name: 'light_hours',
                    type: 'int',
                    isNullable: true,
                    comment: 'ساعات نور مورد نیاز در روز',
                },
                {
                    name: 'temperature_min',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    isNullable: true,
                    comment: 'حداقل دمای مناسب (درجه سانتیگراد)',
                },
                {
                    name: 'temperature_max',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    isNullable: true,
                    comment: 'حداکثر دمای مناسب (درجه سانتیگراد)',
                },
                {
                    name: 'humidity_min',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    isNullable: true,
                    comment: 'حداقل رطوبت مناسب (درصد)',
                },
                {
                    name: 'humidity_max',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    isNullable: true,
                    comment: 'حداکثر رطوبت مناسب (درصد)',
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
        await queryRunner.createIndex('care_schedules', new typeorm_1.TableIndex({
            name: 'IDX_care_schedules_user_scheduled',
            columnNames: ['user_id', 'scheduled_at'],
        }));
        await queryRunner.createIndex('care_schedules', new typeorm_1.TableIndex({
            name: 'IDX_care_schedules_device_status',
            columnNames: ['device_id', 'status'],
        }));
        await queryRunner.createIndex('care_schedules', new typeorm_1.TableIndex({
            name: 'IDX_care_schedules_selection_status',
            columnNames: ['selection_id', 'status'],
        }));
        await queryRunner.createForeignKey('care_schedules', new typeorm_1.TableForeignKey({
            name: 'FK_care_schedules_user',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
        await queryRunner.createForeignKey('care_schedules', new typeorm_1.TableForeignKey({
            name: 'FK_care_schedules_device',
            columnNames: ['device_id'],
            referencedTableName: 'devices',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
        await queryRunner.createForeignKey('care_schedules', new typeorm_1.TableForeignKey({
            name: 'FK_care_schedules_selection',
            columnNames: ['selection_id'],
            referencedTableName: 'user_plant_selections',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('care_schedules', 'FK_care_schedules_selection');
        await queryRunner.dropForeignKey('care_schedules', 'FK_care_schedules_device');
        await queryRunner.dropForeignKey('care_schedules', 'FK_care_schedules_user');
        await queryRunner.dropIndex('care_schedules', 'IDX_care_schedules_selection_status');
        await queryRunner.dropIndex('care_schedules', 'IDX_care_schedules_device_status');
        await queryRunner.dropIndex('care_schedules', 'IDX_care_schedules_user_scheduled');
        await queryRunner.dropTable('care_schedules');
        await queryRunner.query(`DROP TYPE IF EXISTS care_schedules_status_enum;`);
        await queryRunner.query(`DROP TYPE IF EXISTS care_schedules_schedule_type_enum;`);
    }
}
exports.CreateCareSchedulesTable1700000000017 = CreateCareSchedulesTable1700000000017;
//# sourceMappingURL=1700000000018-CreateCareSchedulesTable.js.map