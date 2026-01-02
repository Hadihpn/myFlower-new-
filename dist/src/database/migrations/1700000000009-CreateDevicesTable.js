"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDevicesTable1700000000009 = void 0;
const typeorm_1 = require("typeorm");
class CreateDevicesTable1700000000009 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'devices',
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
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'location',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['active', 'offline', 'maintenance'],
                    default: "'active'",
                    isNullable: false,
                },
                {
                    name: 'token_hash',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'last_seen',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'calibration',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('devices', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createIndex('devices', new typeorm_1.TableIndex({
            name: 'IDX_DEVICES_USER_ID',
            columnNames: ['user_id'],
        }));
        await queryRunner.createIndex('devices', new typeorm_1.TableIndex({
            name: 'IDX_DEVICES_DEVICE_ID',
            columnNames: ['device_id'],
        }));
        await queryRunner.createIndex('devices', new typeorm_1.TableIndex({
            name: 'IDX_DEVICES_STATUS',
            columnNames: ['status'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('devices', 'IDX_DEVICES_STATUS');
        await queryRunner.dropIndex('devices', 'IDX_DEVICES_DEVICE_ID');
        await queryRunner.dropIndex('devices', 'IDX_DEVICES_USER_ID');
        const table = await queryRunner.getTable('devices');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('devices', foreignKey);
        }
        await queryRunner.dropTable('devices');
    }
}
exports.CreateDevicesTable1700000000009 = CreateDevicesTable1700000000009;
//# sourceMappingURL=1700000000009-CreateDevicesTable.js.map