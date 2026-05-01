"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationSettingsTable1700000000020 = void 0;
const typeorm_1 = require("typeorm");
class CreateNotificationSettingsTable1700000000020 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'notification_settings',
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
                    isUnique: true,
                },
                {
                    name: 'email_enabled',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'sudden_change_alerts',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'threshold_alerts',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'welcome_emails',
                    type: 'boolean',
                    default: true,
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
        await queryRunner.createForeignKey('notification_settings', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('notification_settings');
        const foreignKey = table?.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('notification_settings', foreignKey);
        }
        await queryRunner.dropTable('notification_settings');
    }
}
exports.CreateNotificationSettingsTable1700000000020 = CreateNotificationSettingsTable1700000000020;
//# sourceMappingURL=1700000000016-CreateNotificationSettingsTable.js.map