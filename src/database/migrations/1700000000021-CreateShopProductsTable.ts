// src/database/migrations/1700000000014-CreateShopProductsTable.ts
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateShopProductsTable1700000000021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true,
    );

    await queryRunner.createIndex(
      'shop_products',
      new TableIndex({
        name: 'IDX_SHOP_PRODUCTS_PRODUCT_TYPE',
        columnNames: ['product_type'],
      }),
    );

    await queryRunner.createIndex(
      'shop_products',
      new TableIndex({
        name: 'IDX_SHOP_PRODUCTS_IS_ACTIVE',
        columnNames: ['is_active'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('shop_products', 'IDX_SHOP_PRODUCTS_IS_ACTIVE');
    await queryRunner.dropIndex('shop_products', 'IDX_SHOP_PRODUCTS_PRODUCT_TYPE');
    await queryRunner.dropTable('shop_products');
  }
}
