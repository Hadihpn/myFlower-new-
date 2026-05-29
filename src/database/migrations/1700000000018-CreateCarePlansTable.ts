import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateCarePlansTable1700000000018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'care_plans',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_plant_selection_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'completed', 'cancelled'],
            default: "'active'",
          },
          {
            name: 'generator_type',
            type: 'enum',
            enum: ['ai', 'rule_based'],
            isNullable: false,
          },
          {
            name: 'start_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'sensor_snapshot',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'ai_recommendations',
            type: 'text',
            isNullable: true,
          },
          // {
          //   name: 'ai_request_time',
          //   type: 'int',
          //   isNullable: false,
          // },
          // {
          //   name: 'ai_used_at',
          //   type: 'timestamp',
          //   default: 'CURRENT_TIMESTAMP',
          // },
          //  {
          //   name: 'active',
          //   type: 'bool',
          //   default: true,
          // },
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
      'care_plans',
      new TableIndex({
        name: 'IDX_CARE_PLANS_USER_PLANT_SELECTION_ID',
        columnNames: ['user_plant_selection_id'],
      }),
    );

    await queryRunner.createIndex(
      'care_plans',
      new TableIndex({
        name: 'IDX_CARE_PLANS_STATUS',
        columnNames: ['status'],
      }),
    );

    await queryRunner.createForeignKey(
      'care_plans',
      new TableForeignKey({
        columnNames: ['user_plant_selection_id'],
        referencedTableName: 'user_plant_selections',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('care_plans');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_plant_selection_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('care_plans', foreignKey);
    }

    await queryRunner.dropIndex('care_plans', 'IDX_CARE_PLANS_STATUS');
    await queryRunner.dropIndex('care_plans', 'IDX_CARE_PLANS_USER_PLANT_SELECTION_ID');
    await queryRunner.dropTable('care_plans');
  }
}
