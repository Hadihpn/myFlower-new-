"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShopProductsTable1700000000021 = void 0;
const typeorm_1 = require("typeorm");
class CreateShopProductsTable1700000000021 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'shop_products',
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
                    isNullable: false,
                },
                {
                    name: 'product_type',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'image_url',
                    type: 'varchar',
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
            ],
        }), true);
        await queryRunner.createIndex('shop_products', new typeorm_1.TableIndex({
            name: 'IDX_SHOP_PRODUCTS_PRODUCT_TYPE',
            columnNames: ['product_type'],
        }));
        await queryRunner.createIndex('shop_products', new typeorm_1.TableIndex({
            name: 'IDX_SHOP_PRODUCTS_IS_ACTIVE',
            columnNames: ['is_active'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('shop_products', 'IDX_SHOP_PRODUCTS_IS_ACTIVE');
        await queryRunner.dropIndex('shop_products', 'IDX_SHOP_PRODUCTS_PRODUCT_TYPE');
        await queryRunner.dropTable('shop_products');
    }
}
exports.CreateShopProductsTable1700000000021 = CreateShopProductsTable1700000000021;
//# sourceMappingURL=1700000000021-CreateShopProductsTable.js.map