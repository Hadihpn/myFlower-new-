import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateUserActionsTable1700000000013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_actions',
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
            type: 'int',
            isNullable: false,
          },
          {
            name: 'selection_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'action_type',
            type: 'enum',
            enum: ['watered', 'fertilized', 'pruned', 'moved', 'other'],
            isNullable: false,
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'action_date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'user_actions',
      new TableForeignKey({
        name: 'FK_USER_ACTIONS_USER',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_actions',
      new TableForeignKey({
        name: 'FK_USER_ACTIONS_DEVICE',
        columnNames: ['device_id'],
        referencedTableName: 'devices',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_actions',
      new TableForeignKey({
        name: 'FK_USER_ACTIONS_SELECTION',
        columnNames: ['selection_id'],
        referencedTableName: 'user_plant_selections',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // matches @Index(['selectionId', 'actionDate']) on entity
    await queryRunner.createIndex(
      'user_actions',
      new TableIndex({
        name: 'IDX_USER_ACTIONS_SELECTION_DATE',
        columnNames: ['selection_id', 'action_date'],
      }),
    );

    await queryRunner.createIndex(
      'user_actions',
      new TableIndex({
        name: 'IDX_USER_ACTIONS_USER',
        columnNames: ['user_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('user_actions', 'IDX_USER_ACTIONS_USER');
    await queryRunner.dropIndex('user_actions', 'IDX_USER_ACTIONS_SELECTION_DATE');
    await queryRunner.dropForeignKey('user_actions', 'FK_USER_ACTIONS_SELECTION');
    await queryRunner.dropForeignKey('user_actions', 'FK_USER_ACTIONS_DEVICE');
    await queryRunner.dropForeignKey('user_actions', 'FK_USER_ACTIONS_USER');
    await queryRunner.dropTable('user_actions');
  }
}
