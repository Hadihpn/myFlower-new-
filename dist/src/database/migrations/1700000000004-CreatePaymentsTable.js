"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentsTable1700000000004 = void 0;
const typeorm_1 = require("typeorm");
class CreatePaymentsTable1700000000004 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'payments',
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
                    name: 'subscription_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'amount',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['pending', 'completed', 'failed', 'refunded'],
                    default: "'pending'",
                    isNullable: false,
                },
                {
                    name: 'authority',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'ref_id',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'card_pan',
                    type: 'varchar',
                    length: '20',
                    isNullable: true,
                },
                {
                    name: 'metadata',
                    type: 'json',
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
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('payments', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('payments', new typeorm_1.TableForeignKey({
            columnNames: ['subscription_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user_subscriptions',
            onDelete: 'RESTRICT',
        }));
        await queryRunner.createIndex('payments', new typeorm_1.TableIndex({
            name: 'IDX_PAYMENTS_USER_ID',
            columnNames: ['user_id'],
        }));
        await queryRunner.createIndex('payments', new typeorm_1.TableIndex({
            name: 'IDX_PAYMENTS_AUTHORITY',
            columnNames: ['authority'],
        }));
        await queryRunner.createIndex('payments', new typeorm_1.TableIndex({
            name: 'IDX_PAYMENTS_STATUS',
            columnNames: ['status'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('payments', 'IDX_PAYMENTS_STATUS');
        await queryRunner.dropIndex('payments', 'IDX_PAYMENTS_AUTHORITY');
        await queryRunner.dropIndex('payments', 'IDX_PAYMENTS_USER_ID');
        const table = await queryRunner.getTable('payments');
        const foreignKeys = table.foreignKeys;
        for (const foreignKey of foreignKeys) {
            await queryRunner.dropForeignKey('payments', foreignKey);
        }
        await queryRunner.dropTable('payments');
    }
}
exports.CreatePaymentsTable1700000000004 = CreatePaymentsTable1700000000004;
//# sourceMappingURL=1700000000004-CreatePaymentsTable.js.map