"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSensorReadingsTable1700000000010 = void 0;
const typeorm_1 = require("typeorm");
class CreateSensorReadingsTable1700000000010 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        await queryRunner.createForeignKey('sensor_readings', new typeorm_1.TableForeignKey({
            columnNames: ['device_id'],
            referencedTableName: 'devices',
            referencedColumnNames: ['device_id'],
            onDelete: 'CASCADE',
            name: 'FK_SENSOR_READINGS_DEVICE',
        }));
        await queryRunner.createIndex('sensor_readings', new typeorm_1.TableIndex({
            name: 'IDX_SENSOR_READINGS_DEVICE_TIMESTAMP',
            columnNames: ['device_id', 'timestamp'],
        }));
        await queryRunner.createIndex('sensor_readings', new typeorm_1.TableIndex({
            name: 'IDX_SENSOR_READINGS_TIMESTAMP',
            columnNames: ['timestamp'],
        }));
        await queryRunner.createIndex('sensor_readings', new typeorm_1.TableIndex({
            name: 'IDX_SENSOR_READINGS_ANOMALY',
            columnNames: ['anomaly'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('sensor_readings', 'IDX_SENSOR_READINGS_ANOMALY');
        await queryRunner.dropIndex('sensor_readings', 'IDX_SENSOR_READINGS_TIMESTAMP');
        await queryRunner.dropIndex('sensor_readings', 'IDX_SENSOR_READINGS_DEVICE_TIMESTAMP');
        await queryRunner.dropForeignKey('sensor_readings', 'FK_SENSOR_READINGS_DEVICE');
        await queryRunner.dropTable('sensor_readings');
    }
}
exports.CreateSensorReadingsTable1700000000010 = CreateSensorReadingsTable1700000000010;
//# sourceMappingURL=1700000000010-CreateSensorReadingsTable.js.map