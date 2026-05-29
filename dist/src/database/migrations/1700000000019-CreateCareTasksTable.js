"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCareTasksTable1700000000019 = void 0;
const typeorm_1 = require("typeorm");
class CreateCareTasksTable1700000000019 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'care_tasks',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'care_plan_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'task_type',
                    type: 'enum',
                    enum: ['watering', 'fertilizing', 'pesticide', 'light_adjustment', 'pruning'],
                    isNullable: false,
                },
                {
                    name: 'scheduled_date',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'optimal_time',
                    type: 'enum',
                    enum: ['morning', 'afternoon', 'evening'],
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['pending', 'completed', 'skipped', 'cancelled'],
                    default: "'pending'",
                },
                {
                    name: 'instructions',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'shop_product_type',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'completed_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createIndex('care_tasks', new typeorm_1.TableIndex({
            name: 'IDX_CARE_TASKS_CARE_PLAN_ID',
            columnNames: ['care_plan_id'],
        }));
        await queryRunner.createIndex('care_tasks', new typeorm_1.TableIndex({
            name: 'IDX_CARE_TASKS_SCHEDULED_DATE',
            columnNames: ['scheduled_date'],
        }));
        await queryRunner.createIndex('care_tasks', new typeorm_1.TableIndex({
            name: 'IDX_CARE_TASKS_STATUS',
            columnNames: ['status'],
        }));
        await queryRunner.createForeignKey('care_tasks', new typeorm_1.TableForeignKey({
            columnNames: ['care_plan_id'],
            referencedTableName: 'care_plans',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('care_tasks');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('care_plan_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('care_tasks', foreignKey);
        }
        await queryRunner.dropIndex('care_tasks', 'IDX_CARE_TASKS_STATUS');
        await queryRunner.dropIndex('care_tasks', 'IDX_CARE_TASKS_SCHEDULED_DATE');
        await queryRunner.dropIndex('care_tasks', 'IDX_CARE_TASKS_CARE_PLAN_ID');
        await queryRunner.dropTable('care_tasks');
    }
}
exports.CreateCareTasksTable1700000000019 = CreateCareTasksTable1700000000019;
//# sourceMappingURL=1700000000019-CreateCareTasksTable.js.map