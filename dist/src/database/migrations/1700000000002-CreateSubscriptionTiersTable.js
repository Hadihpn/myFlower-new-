"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubscriptionTiersTable1700000000002 = void 0;
const typeorm_1 = require("typeorm");
class CreateSubscriptionTiersTable1700000000002 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'subscription_tiers',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'plant_slot_limit',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'billing_cycle',
                    type: 'enum',
                    enum: ['monthly', 'yearly'],
                    default: "'monthly'",
                    isNullable: false,
                },
                {
                    name: 'features',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('subscription_tiers');
    }
}
exports.CreateSubscriptionTiersTable1700000000002 = CreateSubscriptionTiersTable1700000000002;
//# sourceMappingURL=1700000000002-CreateSubscriptionTiersTable.js.map