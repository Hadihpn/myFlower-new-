"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCareTaskFeedbacksTable1700000000020 = void 0;
const typeorm_1 = require("typeorm");
class CreateCareTaskFeedbacksTable1700000000020 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'care_task_feedbacks',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'care_task_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'action',
                    type: 'enum',
                    enum: ['completed', 'skipped'],
                    isNullable: false,
                },
                {
                    name: 'reason',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'note',
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
        await queryRunner.createIndex('care_task_feedbacks', new typeorm_1.TableIndex({
            name: 'IDX_CARE_TASK_FEEDBACKS_CARE_TASK_ID',
            columnNames: ['care_task_id'],
        }));
        await queryRunner.createIndex('care_task_feedbacks', new typeorm_1.TableIndex({
            name: 'IDX_CARE_TASK_FEEDBACKS_USER_ID',
            columnNames: ['user_id'],
        }));
        await queryRunner.createForeignKey('care_task_feedbacks', new typeorm_1.TableForeignKey({
            columnNames: ['care_task_id'],
            referencedTableName: 'care_tasks',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('care_task_feedbacks', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('care_task_feedbacks');
        const userForeignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
        if (userForeignKey) {
            await queryRunner.dropForeignKey('care_task_feedbacks', userForeignKey);
        }
        const taskForeignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('care_task_id') !== -1);
        if (taskForeignKey) {
            await queryRunner.dropForeignKey('care_task_feedbacks', taskForeignKey);
        }
        await queryRunner.dropIndex('care_task_feedbacks', 'IDX_CARE_TASK_FEEDBACKS_USER_ID');
        await queryRunner.dropIndex('care_task_feedbacks', 'IDX_CARE_TASK_FEEDBACKS_CARE_TASK_ID');
        await queryRunner.dropTable('care_task_feedbacks');
    }
}
exports.CreateCareTaskFeedbacksTable1700000000020 = CreateCareTaskFeedbacksTable1700000000020;
//# sourceMappingURL=1700000000020-CreateCareTaskFeedbacksTable.js.map