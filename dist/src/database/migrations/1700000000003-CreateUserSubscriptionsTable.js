"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSubscriptionsTable1700000000003 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserSubscriptionsTable1700000000003 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_subscriptions',
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
                    name: 'tier_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['active', 'expired', 'cancelled', 'pending'],
                    default: "'pending'",
                    isNullable: false,
                },
                {
                    name: 'start_date',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'end_date',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'auto_renew',
                    type: 'boolean',
                    default: false,
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
        await queryRunner.createForeignKey('user_subscriptions', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('user_subscriptions', new typeorm_1.TableForeignKey({
            columnNames: ['tier_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'subscription_tiers',
            onDelete: 'RESTRICT',
        }));
        await queryRunner.createIndex('user_subscriptions', new typeorm_1.TableIndex({
            name: 'IDX_USER_SUBSCRIPTIONS_USER_STATUS',
            columnNames: ['user_id', 'status'],
        }));
        await queryRunner.createIndex('user_subscriptions', new typeorm_1.TableIndex({
            name: 'IDX_USER_SUBSCRIPTIONS_END_DATE',
            columnNames: ['end_date'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('user_subscriptions', 'IDX_USER_SUBSCRIPTIONS_END_DATE');
        await queryRunner.dropIndex('user_subscriptions', 'IDX_USER_SUBSCRIPTIONS_USER_STATUS');
        const table = await queryRunner.getTable('user_subscriptions');
        const foreignKeys = table.foreignKeys;
        for (const foreignKey of foreignKeys) {
            await queryRunner.dropForeignKey('user_subscriptions', foreignKey);
        }
        await queryRunner.dropTable('user_subscriptions');
    }
}
exports.CreateUserSubscriptionsTable1700000000003 = CreateUserSubscriptionsTable1700000000003;
//# sourceMappingURL=1700000000003-CreateUserSubscriptionsTable.js.map