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
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'user_plant_selection_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['active', 'completed', 'cancelled'],
                    default: "'active'",
                },
                {
                    name: 'generator_type',
                    type: 'enum',
                    enum: ['ai', 'rule_based'],
                    isNullable: false,
                },
                {
                    name: 'start_date',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'end_date',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'sensor_snapshot',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'ai_recommendations',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createIndex('care_plans', new typeorm_1.TableIndex({
            name: 'IDX_CARE_PLANS_USER_PLANT_SELECTION_ID',
            columnNames: ['user_plant_selection_id'],
        }));
        await queryRunner.createIndex('care_plans', new typeorm_1.TableIndex({
            name: 'IDX_CARE_PLANS_STATUS',
            columnNames: ['status'],
        }));
        await queryRunner.createForeignKey('care_plans', new typeorm_1.TableForeignKey({
            columnNames: ['user_plant_selection_id'],
            referencedTableName: 'user_plant_selections',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('care_plans');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_plant_selection_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('care_plans', foreignKey);
        }
        await queryRunner.dropIndex('care_plans', 'IDX_CARE_PLANS_STATUS');
        await queryRunner.dropIndex('care_plans', 'IDX_CARE_PLANS_USER_PLANT_SELECTION_ID');
        await queryRunner.dropTable('care_plans');
    }
}
exports.CreateCarePlansTable1700000000018 = CreateCarePlansTable1700000000018;
//# sourceMappingURL=1700000000018-CreateCarePlansTable.js.map