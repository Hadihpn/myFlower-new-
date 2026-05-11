// src/migrations/1700000000017-CreateFertilizerProductsTable.ts

import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateFertilizerProductsTable1700000000017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true,
    );

    await queryRunner.createIndex(
      'fertilizer_products',
      new TableIndex({
        name: 'IDX_fertilizer_products_type',
        columnNames: ['type'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fertilizer_products');
  }
}
