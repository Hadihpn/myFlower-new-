import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateNotificationsTable1700000000017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
            name: 'title',  // ✅ اضافه شد
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
            name: 'metadata',  // ✅ اضافه شد
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
      }),
      true,
    );

    // Index for userId + isRead (for unread queries)
    await queryRunner.createIndex(
      'notifications',
      new TableIndex({
        name: 'IDX_notifications_userId_isRead',
        columnNames: ['userId', 'isRead'],
      }),
    );

    // Index for userId + createdAt (for pagination, DESC order)
    await queryRunner.createIndex(
      'notifications',
      new TableIndex({
        name: 'IDX_notifications_userId_createdAt',
        columnNames: ['userId', 'createdAt'],
      }),
    );

    // ✅ Index for deviceId (برای query بر اساس device)
    await queryRunner.createIndex(
      'notifications',
      new TableIndex({
        name: 'IDX_notifications_deviceId',
        columnNames: ['deviceId'],
      }),
    );

    // Foreign key to users
    await queryRunner.createForeignKey(
      'notifications',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Foreign key to devices (nullable)
    await queryRunner.createForeignKey(
      'notifications',
      new TableForeignKey({
        columnNames: ['deviceId'],
        referencedTableName: 'devices',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('notifications');
    
    if (table) {
      // Drop foreign keys
      const userFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
      const deviceFk = table.foreignKeys.find(fk => fk.columnNames.indexOf('deviceId') !== -1);
      
      if (userFk) await queryRunner.dropForeignKey('notifications', userFk);
      if (deviceFk) await queryRunner.dropForeignKey('notifications', deviceFk);
    }
    
    await queryRunner.dropTable('notifications');
  }
}