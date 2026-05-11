"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationsTable1700000000017 = void 0;
const typeorm_1 = require("typeorm");
class CreateNotificationsTable1700000000017 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'notifications',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'deviceId',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'type',
                    type: 'enum',
                    enum: ['threshold_alert', 'sudden_change', 'device_offline', 'system'],
                    isNullable: false,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'message',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'severity',
                    type: 'enum',
                    enum: ['info', 'warning', 'critical'],
                    default: "'info'",
                    isNullable: false,
                },
                {
                    name: 'metadata',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'isRead',
                    type: 'boolean',
                    default: false,
                    isNullable: false,
                },
                {
                    name: 'readAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createIndex('notifications', new typeorm_1.TableIndex({
            name: 'IDX_notifications_userId_isRead',
            columnNames: ['userId', 'isRead'],
        }));
        await queryRunner.createIndex('notifications', new typeorm_1.TableIndex({
            name: 'IDX_notifications_userId_createdAt',
            columnNames: ['userId', 'createdAt'],
        }));
        await queryRunner.createIndex('notifications', new typeorm_1.TableIndex({
            name: 'IDX_notifications_deviceId',
            columnNames: ['deviceId'],
        }));
        await queryRunner.createForeignKey('notifications', new typeorm_1.TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('notifications', new typeorm_1.TableForeignKey({
            columnNames: ['deviceId'],
            referencedTableName: 'devices',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('notifications');
        if (table) {
            const userFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
            const deviceFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('deviceId') !== -1);
            if (userFk)
                await queryRunner.dropForeignKey('notifications', userFk);
            if (deviceFk)
                await queryRunner.dropForeignKey('notifications', deviceFk);
        }
        await queryRunner.dropTable('notifications');
    }
}
exports.CreateNotificationsTable1700000000017 = CreateNotificationsTable1700000000017;
//# sourceMappingURL=1700000000017-CreateNotificationsTable.js.map