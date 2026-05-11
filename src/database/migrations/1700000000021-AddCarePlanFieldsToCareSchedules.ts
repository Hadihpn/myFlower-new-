// src/migrations/1700000000019-AddCarePlanFieldsToCareSchedules.ts

import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';

export class AddCarePlanFieldsToCareSchedules1700000000019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // اضافه کردن enum جدید به status
    await queryRunner.query(`
      ALTER TYPE "care_schedule_status" ADD VALUE IF NOT EXISTS 'skipped';
    `);

    // اضافه کردن enum جدید به task_type
    await queryRunner.query(`
      ALTER TYPE "care_task_type" ADD VALUE IF NOT EXISTS 'pesticide';
    `);

    // اضافه کردن فیلدهای جدید
    await queryRunner.addColumn(
      'care_schedules',
      new TableColumn({
        name: 'care_plan_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'care_schedules',
      new TableColumn({
        name: 'product_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'care_schedules',
      new TableColumn({
        name: 'dosage',
        type: 'varchar',
        length: '50',
        isNullable: true,
      }),
    );

    // اضافه کردن index
    await queryRunner.createIndex(
      'care_schedules',
      new TableIndex({
        name: 'IDX_care_schedules_care_plan_id',
        columnNames: ['care_plan_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('care_schedules', 'IDX_care_schedules_care_plan_id');
    await queryRunner.dropColumn('care_schedules', 'dosage');
    await queryRunner.dropColumn('care_schedules', 'product_id');
    await queryRunner.dropColumn('care_schedules', 'care_plan_id');
  }
}
