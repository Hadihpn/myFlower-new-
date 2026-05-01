"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeviceSensorStats1700000000015 = void 0;
const typeorm_1 = require("typeorm");
class CreateDeviceSensorStats1700000000015 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        await queryRunner.createIndex('device_sensor_stats', new typeorm_1.TableIndex({
            name: 'IDX_device_sensor_stats_device_id',
            columnNames: ['device_id'],
            isUnique: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('device_sensor_stats', 'IDX_device_sensor_stats_device_id');
        await queryRunner.dropTable('device_sensor_stats');
    }
}
exports.CreateDeviceSensorStats1700000000015 = CreateDeviceSensorStats1700000000015;
//# sourceMappingURL=1700000000015-CreateDeviceSensorStatsTable.js.map