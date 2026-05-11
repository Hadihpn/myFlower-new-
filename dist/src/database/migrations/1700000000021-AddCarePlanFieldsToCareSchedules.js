"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCarePlanFieldsToCareSchedules1700000000019 = void 0;
const typeorm_1 = require("typeorm");
class AddCarePlanFieldsToCareSchedules1700000000019 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TYPE "care_schedule_status" ADD VALUE IF NOT EXISTS 'skipped';
    `);
        await queryRunner.query(`
      ALTER TYPE "care_task_type" ADD VALUE IF NOT EXISTS 'pesticide';
    `);
        await queryRunner.addColumn('care_schedules', new typeorm_1.TableColumn({
            name: 'care_plan_id',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.addColumn('care_schedules', new typeorm_1.TableColumn({
            name: 'product_id',
            type: 'int',
            isNullable: true,
        }));
        await queryRunner.addColumn('care_schedules', new typeorm_1.TableColumn({
            name: 'dosage',
            type: 'varchar',
            length: '50',
            isNullable: true,
        }));
        await queryRunner.createIndex('care_schedules', new typeorm_1.TableIndex({
            name: 'IDX_care_schedules_care_plan_id',
            columnNames: ['care_plan_id'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('care_schedules', 'IDX_care_schedules_care_plan_id');
        await queryRunner.dropColumn('care_schedules', 'dosage');
        await queryRunner.dropColumn('care_schedules', 'product_id');
        await queryRunner.dropColumn('care_schedules', 'care_plan_id');
    }
}
exports.AddCarePlanFieldsToCareSchedules1700000000019 = AddCarePlanFieldsToCareSchedules1700000000019;
//# sourceMappingURL=1700000000021-AddCarePlanFieldsToCareSchedules.js.map