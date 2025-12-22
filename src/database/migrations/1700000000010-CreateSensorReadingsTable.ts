import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateSensorReadingsTable1700000000010
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sensor_readings',
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
            name: 'temperature',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'moisture',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'light',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'humidity',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'timestamp',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'anomaly',
            type: 'boolean',
            default: false,
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

    // Foreign key
    await queryRunner.createForeignKey(
      'sensor_readings',
      new TableForeignKey({
        columnNames: ['device_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'devices',
        onDelete: 'CASCADE',
      }),
    );

    // Composite index for efficient time-series queries
    await queryRunner.createIndex(
      'sensor_readings',
      new TableIndex({
        name: 'IDX_SENSOR_READINGS_DEVICE_TIMESTAMP',
        columnNames: ['device_id', 'timestamp'],
      }),
    );

    await queryRunner.createIndex(
      'sensor_readings',
      new TableIndex({
        name: 'IDX_SENSOR_READINGS_TIMESTAMP',
        columnNames: ['timestamp'],
      }),
    );

    await queryRunner.createIndex(
      'sensor_readings',
      new TableIndex({
        name: 'IDX_SENSOR_READINGS_ANOMALY',
        columnNames: ['anomaly'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'sensor_readings',
      'IDX_SENSOR_READINGS_ANOMALY',
    );
    await queryRunner.dropIndex(
      'sensor_readings',
      'IDX_SENSOR_READINGS_TIMESTAMP',
    );
    await queryRunner.dropIndex(
      'sensor_readings',
      'IDX_SENSOR_READINGS_DEVICE_TIMESTAMP',
    );

    const table = await queryRunner.getTable('sensor_readings');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('device_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('sensor_readings', foreignKey);
    }

    await queryRunner.dropTable('sensor_readings');
  }
}