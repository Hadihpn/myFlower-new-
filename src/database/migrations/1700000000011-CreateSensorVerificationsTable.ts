import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateSensorVerificationsTable1700000000011
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sensor_verifications',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'device_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'trigger_reading_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'completed', 'expired'],
            default: "'pending'",
            isNullable: false,
          },
          {
            name: 'change_type',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'change_magnitude',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'verification_readings',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'confirmed',
            type: 'boolean',
            default: false,
          },
          {
            name: 'confidence',
            type: 'enum',
            enum: ['high', 'medium', 'low'],
            isNullable: true,
          },
          {
            name: 'requested_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'completed_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'expires_at',
            type: 'timestamp',
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
      'sensor_verifications',
      new TableForeignKey({
        columnNames: ['device_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'devices',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'sensor_verifications',
      new TableForeignKey({
        columnNames: ['trigger_reading_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sensor_readings',
        onDelete: 'CASCADE',
      }),
    );

    // Indexes
    await queryRunner.createIndex(
      'sensor_verifications',
      new TableIndex({
        name: 'IDX_SENSOR_VERIFICATIONS_DEVICE_STATUS',
        columnNames: ['device_id', 'status'],
      }),
    );

    await queryRunner.createIndex(
      'sensor_verifications',
      new TableIndex({
        name: 'IDX_SENSOR_VERIFICATIONS_EXPIRES_AT',
        columnNames: ['expires_at'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'sensor_verifications',
      'IDX_SENSOR_VERIFICATIONS_EXPIRES_AT',
    );
    await queryRunner.dropIndex(
      'sensor_verifications',
      'IDX_SENSOR_VERIFICATIONS_DEVICE_STATUS',
    );

    const table = await queryRunner.getTable('sensor_verifications');
    const foreignKeys = table.foreignKeys;
    for (const foreignKey of foreignKeys) {
      await queryRunner.dropForeignKey('sensor_verifications', foreignKey);
    }

    await queryRunner.dropTable('sensor_verifications');
  }
}