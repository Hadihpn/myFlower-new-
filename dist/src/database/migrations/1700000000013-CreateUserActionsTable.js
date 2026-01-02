"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserActionsTable1700000000013 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserActionsTable1700000000013 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_actions',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'user_id', type: 'int', isNullable: false },
                { name: 'device_id', type: 'int', isNullable: false },
                { name: 'selection_id', type: 'int', isNullable: false },
                { name: 'action_type', type: 'varchar', length: '50', isNullable: false },
                { name: 'notes', type: 'text', isNullable: true },
                { name: 'action_date', type: 'timestamp', isNullable: false },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
            ],
        }), true);
        await queryRunner.createForeignKey('user_actions', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('user_actions', new typeorm_1.TableForeignKey({
            columnNames: ['device_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'devices',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('user_actions', new typeorm_1.TableForeignKey({
            columnNames: ['selection_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user_plant_selections',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createIndex('user_actions', new typeorm_1.TableIndex({
            name: 'IDX_USER_ACTIONS_SELECTION_DATE',
            columnNames: ['selection_id', 'action_date'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('user_actions', 'IDX_USER_ACTIONS_SELECTION_DATE');
        const table = await queryRunner.getTable('user_actions');
        for (const fk of table.foreignKeys) {
            await queryRunner.dropForeignKey('user_actions', fk);
        }
        await queryRunner.dropTable('user_actions');
    }
}
exports.CreateUserActionsTable1700000000013 = CreateUserActionsTable1700000000013;
//# sourceMappingURL=1700000000013-CreateUserActionsTable.js.map