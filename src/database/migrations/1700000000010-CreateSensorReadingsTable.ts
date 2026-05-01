import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateSensorReadingsTable1700000000010 implements MigrationInterface {
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
            type: 'varchar',
            length: '255',
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
            isNullable: false,
          },
          {
            name: 'anomaly',
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
        ],
      }),
      true,
    );

    // Foreign key to devices.device_id (string)
    await queryRunner.createForeignKey(
      'sensor_readings',
      new TableForeignKey({
        columnNames: ['device_id'],
        referencedTableName: 'devices',
        referencedColumnNames: ['device_id'],
        onDelete: 'CASCADE',
        name: 'FK_SENSOR_READINGS_DEVICE',
      }),
    );

    // Composite index on device_id and timestamp
    await queryRunner.createIndex(
      'sensor_readings',
      new TableIndex({
        name: 'IDX_SENSOR_READINGS_DEVICE_TIMESTAMP',
        columnNames: ['device_id', 'timestamp'],
      }),
    );

    // Index on timestamp for time-range queries
    await queryRunner.createIndex(
      'sensor_readings',
      new TableIndex({
        name: 'IDX_SENSOR_READINGS_TIMESTAMP',
        columnNames: ['timestamp'],
      }),
    );

    // Index on anomaly for filtering
    await queryRunner.createIndex(
      'sensor_readings',
      new TableIndex({
        name: 'IDX_SENSOR_READINGS_ANOMALY',
        columnNames: ['anomaly'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('sensor_readings', 'IDX_SENSOR_READINGS_ANOMALY');
    await queryRunner.dropIndex('sensor_readings', 'IDX_SENSOR_READINGS_TIMESTAMP');
    await queryRunner.dropIndex('sensor_readings', 'IDX_SENSOR_READINGS_DEVICE_TIMESTAMP');
    await queryRunner.dropForeignKey('sensor_readings', 'FK_SENSOR_READINGS_DEVICE');
    await queryRunner.dropTable('sensor_readings');
  }
}
