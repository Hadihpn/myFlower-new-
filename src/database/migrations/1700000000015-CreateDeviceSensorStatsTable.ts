import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateDeviceSensorStats1700000000015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'device_sensor_stats',
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
            isNullable: false,
          },
          // Temperature
          {
            name: 'temp_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'temp_mean',
            type: 'float',
            default: 0,
          },
          {
            name: 'temp_m2',
            type: 'float',
            default: 0,
          },
          // Moisture
          {
            name: 'moisture_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'moisture_mean',
            type: 'float',
            default: 0,
          },
          {
            name: 'moisture_m2',
            type: 'float',
            default: 0,
          },
          // Light
          {
            name: 'light_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'light_mean',
            type: 'float',
            default: 0,
          },
          {
            name: 'light_m2',
            type: 'float',
            default: 0,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
          },
        ],
      }),
      true, // ifNotExists
    );

    await queryRunner.createIndex(
      'device_sensor_stats',
      new TableIndex({
        name: 'IDX_device_sensor_stats_device_id',
        columnNames: ['device_id'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'device_sensor_stats',
      'IDX_device_sensor_stats_device_id',
    );
    await queryRunner.dropTable('device_sensor_stats');
  }
}
