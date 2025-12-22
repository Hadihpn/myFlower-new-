import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlantPackagesTable1700000000007
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'plant_packages',
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
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'difficulty',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'plant_count',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'thresholds',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'image_url',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'popular',
            type: 'boolean',
            default: false,
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
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plant_packages');
  }
}