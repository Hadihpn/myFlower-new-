"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFertilizerProductsTable1700000000017 = void 0;
const typeorm_1 = require("typeorm");
class CreateFertilizerProductsTable1700000000017 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'fertilizer_products',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'type',
                    type: 'enum',
                    enum: ['npk', 'organic', 'pesticide'],
                    isNullable: false,
                },
                {
                    name: 'npk_ratio',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'active_ingredient',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'recommended_dosage_per_liter',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: true,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true,
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
        await queryRunner.createIndex('fertilizer_products', new typeorm_1.TableIndex({
            name: 'IDX_fertilizer_products_type',
            columnNames: ['type'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('fertilizer_products');
    }
}
exports.CreateFertilizerProductsTable1700000000017 = CreateFertilizerProductsTable1700000000017;
//# sourceMappingURL=1700000000019-CreateFertilizerProductsTable.js.map