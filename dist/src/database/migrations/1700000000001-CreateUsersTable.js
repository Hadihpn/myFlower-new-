"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1700000000001 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1700000000001 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'full_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'phone_number',
                    type: 'varchar',
                    length: '20',
                    isNullable: true,
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: ['user', 'admin'],
                    default: "'user'",
                    isNullable: false,
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
        await queryRunner.createIndex('users', new typeorm_1.TableIndex({
            name: 'IDX_USERS_EMAIL',
            columnNames: ['email'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('users', 'IDX_USERS_EMAIL');
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsersTable1700000000001 = CreateUsersTable1700000000001;
//# sourceMappingURL=1700000000001-CreateUsersTable.js.map