"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserActionsTable1700000000013 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserActionsTable1700000000013 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_actions',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'device_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'selection_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'action_type',
                    type: 'enum',
                    enum: ['watered', 'fertilized', 'pruned', 'moved', 'other'],
                    isNullable: false,
                },
                {
                    name: 'notes',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'action_date',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('user_actions', new typeorm_1.TableForeignKey({
            name: 'FK_USER_ACTIONS_USER',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('user_actions', new typeorm_1.TableForeignKey({
            name: 'FK_USER_ACTIONS_DEVICE',
            columnNames: ['device_id'],
            referencedTableName: 'devices',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('user_actions', new typeorm_1.TableForeignKey({
            name: 'FK_USER_ACTIONS_SELECTION',
            columnNames: ['selection_id'],
            referencedTableName: 'user_plant_selections',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createIndex('user_actions', new typeorm_1.TableIndex({
            name: 'IDX_USER_ACTIONS_SELECTION_DATE',
            columnNames: ['selection_id', 'action_date'],
        }));
        await queryRunner.createIndex('user_actions', new typeorm_1.TableIndex({
            name: 'IDX_USER_ACTIONS_USER',
            columnNames: ['user_id'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('user_actions', 'IDX_USER_ACTIONS_USER');
        await queryRunner.dropIndex('user_actions', 'IDX_USER_ACTIONS_SELECTION_DATE');
        await queryRunner.dropForeignKey('user_actions', 'FK_USER_ACTIONS_SELECTION');
        await queryRunner.dropForeignKey('user_actions', 'FK_USER_ACTIONS_DEVICE');
        await queryRunner.dropForeignKey('user_actions', 'FK_USER_ACTIONS_USER');
        await queryRunner.dropTable('user_actions');
    }
}
exports.CreateUserActionsTable1700000000013 = CreateUserActionsTable1700000000013;
//# sourceMappingURL=1700000000013-CreateUserActionsTable.js.map