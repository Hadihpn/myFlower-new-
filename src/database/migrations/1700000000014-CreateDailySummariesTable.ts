import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateDailySummariesTable1700000000014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'daily_summaries',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'device_id', type: 'int', isNullable: false },
          { name: 'date', type: 'date', isNullable: false },
          { name: 'min_temperature', type: 'decimal', precision: 5, scale: 2, isNullable: false },
          { name: 'max_temperature', type: 'decimal', precision: 5, scale: 2, isNullable: false },
          { name: 'avg_temperature', type: 'decimal', precision: 5, scale: 2, isNullable: false },
          { name: 'min_moisture', type: 'decimal', precision: 5, scale: 2, isNullable: false },
          { name: 'max_moisture', type: 'decimal', precision: 5, scale: 2, isNullable: false },
          { name: 'avg_moisture', type: 'decimal', precision: 5, scale: 2, isNullable: false },
          { name: 'min_light', type: 'decimal', precision: 10, scale: 2, isNullable: false },
          { name: 'max_light', type: 'decimal', precision: 10, scale: 2, isNullable: false },
          { name: 'avg_light', type: 'decimal', precision: 10, scale: 2, isNullable: false },
          { name: 'reading_count', type: 'int', isNullable: false },
          { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey('daily_summaries', new TableForeignKey({
      columnNames: ['device_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'devices',
      onDelete: 'CASCADE',
    }));

    await queryRunner.createIndex('daily_summaries', new TableIndex({
      name: 'IDX_DAILY_SUMMARIES_DEVICE_DATE',
      columnNames: ['device_id', 'date'],
    }));

    await queryRunner.query(
      'ALTER TABLE daily_summaries ADD CONSTRAINT UQ_DAILY_SUMMARIES_DEVICE_DATE UNIQUE (device_id, date)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE daily_summaries DROP CONSTRAINT UQ_DAILY_SUMMARIES_DEVICE_DATE');
    await queryRunner.dropIndex('daily_summaries', 'IDX_DAILY_SUMMARIES_DEVICE_DATE');
    const table = await queryRunner.getTable('daily_summaries');
    const fk = table.foreignKeys.find(fk => fk.columnNames.indexOf('device_id') !== -1);
    if (fk) await queryRunner.dropForeignKey('daily_summaries', fk);
    await queryRunner.dropTable('daily_summaries');
  }
}
