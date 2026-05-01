import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey, TableCheck } from 'typeorm';

export class CreateUserPlantSelectionsTable1700000000012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_plant_selections',
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
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'package_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'plant_species_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'nickname',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'planted_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'currently_monitoring',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Check constraint: exactly one of package_id or plant_species_id must be set
    await queryRunner.createCheckConstraint(
      'user_plant_selections',
      new TableCheck({
        name: 'CHK_USER_PLANT_SELECTIONS_PACKAGE_OR_SPECIES',
        expression: `(package_id IS NOT NULL AND plant_species_id IS NULL) OR (package_id IS NULL AND plant_species_id IS NOT NULL)`,
      }),
    );

    // Foreign keys
    await queryRunner.createForeignKey(
      'user_plant_selections',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        name: 'FK_USER_PLANT_SELECTIONS_USER',
      }),
    );

    await queryRunner.createForeignKey(
      'user_plant_selections',
      new TableForeignKey({
        columnNames: ['device_id'],
        referencedTableName: 'devices',
        referencedColumnNames: ['device_id'],
        onDelete: 'CASCADE',
        name: 'FK_USER_PLANT_SELECTIONS_DEVICE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_plant_selections',
      new TableForeignKey({
        columnNames: ['package_id'],
        referencedTableName: 'plant_packages',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        name: 'FK_USER_PLANT_SELECTIONS_PACKAGE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_plant_selections',
      new TableForeignKey({
        columnNames: ['plant_species_id'],
        referencedTableName: 'plant_species',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        name: 'FK_USER_PLANT_SELECTIONS_SPECIES',
      }),
    );

    // Indexes
    await queryRunner.createIndex(
      'user_plant_selections',
      new TableIndex({
        name: 'IDX_USER_PLANT_SELECTIONS_USER_ACTIVE',
        columnNames: ['user_id', 'active'],
      }),
    );

    await queryRunner.createIndex(
      'user_plant_selections',
      new TableIndex({
        name: 'IDX_USER_PLANT_SELECTIONS_DEVICE',
        columnNames: ['device_id'],
      }),
    );

    await queryRunner.createIndex(
      'user_plant_selections',
      new TableIndex({
        name: 'IDX_USER_PLANT_SELECTIONS_SPECIES',
        columnNames: ['plant_species_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('user_plant_selections', 'IDX_USER_PLANT_SELECTIONS_SPECIES');
    await queryRunner.dropIndex('user_plant_selections', 'IDX_USER_PLANT_SELECTIONS_DEVICE');
    await queryRunner.dropIndex('user_plant_selections', 'IDX_USER_PLANT_SELECTIONS_USER_ACTIVE');
    await queryRunner.dropForeignKey('user_plant_selections', 'FK_USER_PLANT_SELECTIONS_SPECIES');
    await queryRunner.dropForeignKey('user_plant_selections', 'FK_USER_PLANT_SELECTIONS_PACKAGE');
    await queryRunner.dropForeignKey('user_plant_selections', 'FK_USER_PLANT_SELECTIONS_DEVICE');
    await queryRunner.dropForeignKey('user_plant_selections', 'FK_USER_PLANT_SELECTIONS_USER');
    await queryRunner.dropCheckConstraint('user_plant_selections', 'CHK_USER_PLANT_SELECTIONS_PACKAGE_OR_SPECIES');
    await queryRunner.dropTable('user_plant_selections');
  }
}
