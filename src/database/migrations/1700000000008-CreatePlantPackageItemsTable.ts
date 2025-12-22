import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreatePlantPackageItemsTable1700000000008
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'plant_package_items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'package_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'plant_species_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'position',
            type: 'int',
            isNullable: false,
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

    // Foreign keys
    await queryRunner.createForeignKey(
      'plant_package_items',
      new TableForeignKey({
        columnNames: ['package_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'plant_packages',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'plant_package_items',
      new TableForeignKey({
        columnNames: ['plant_species_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'plant_species',
        onDelete: 'CASCADE',
      }),
    );

    // Unique constraint
    await queryRunner.createIndex(
      'plant_package_items',
      new TableIndex({
        name: 'IDX_PACKAGE_SPECIES_UNIQUE',
        columnNames: ['package_id', 'plant_species_id'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'plant_package_items',
      'IDX_PACKAGE_SPECIES_UNIQUE',
    );

    const table = await queryRunner.getTable('plant_package_items');
    const foreignKeys = table.foreignKeys;
    for (const foreignKey of foreignKeys) {
      await queryRunner.dropForeignKey('plant_package_items', foreignKey);
    }

    await queryRunner.dropTable('plant_package_items');
  }
}
