"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserPlantSelectionsTable1700000000012 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserPlantSelectionsTable1700000000012 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_plant_selections',
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
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'package_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'plant_species_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'nickname',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'planted_date',
                    type: 'date',
                    isNullable: true,
                },
                {
                    name: 'location',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'notes',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'currently_monitoring',
                    type: 'boolean',
                    default: false,
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
        await queryRunner.query(`ALTER TABLE user_plant_selections ADD CONSTRAINT CHK_PACKAGE_OR_SPECIES 
       CHECK ((package_id IS NOT NULL AND plant_species_id IS NULL) OR 
              (package_id IS NULL AND plant_species_id IS NOT NULL))`);
        await queryRunner.createForeignKey('user_plant_selections', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('user_plant_selections', new typeorm_1.TableForeignKey({
            columnNames: ['device_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'devices',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('user_plant_selections', new typeorm_1.TableForeignKey({
            columnNames: ['package_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'plant_packages',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('user_plant_selections', new typeorm_1.TableForeignKey({
            columnNames: ['plant_species_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'plant_species',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createIndex('user_plant_selections', new typeorm_1.TableIndex({
            name: 'IDX_USER_PLANT_SELECTIONS_USER_ID',
            columnNames: ['user_id'],
        }));
        await queryRunner.createIndex('user_plant_selections', new typeorm_1.TableIndex({
            name: 'IDX_USER_PLANT_SELECTIONS_DEVICE_ID',
            columnNames: ['device_id'],
        }));
        await queryRunner.createIndex('user_plant_selections', new typeorm_1.TableIndex({
            name: 'IDX_USER_PLANT_SELECTIONS_MONITORING',
            columnNames: ['device_id', 'currently_monitoring'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('user_plant_selections', 'IDX_USER_PLANT_SELECTIONS_MONITORING');
        await queryRunner.dropIndex('user_plant_selections', 'IDX_USER_PLANT_SELECTIONS_DEVICE_ID');
        await queryRunner.dropIndex('user_plant_selections', 'IDX_USER_PLANT_SELECTIONS_USER_ID');
        const table = await queryRunner.getTable('user_plant_selections');
        const foreignKeys = table.foreignKeys;
        for (const foreignKey of foreignKeys) {
            await queryRunner.dropForeignKey('user_plant_selections', foreignKey);
        }
        await queryRunner.query('ALTER TABLE user_plant_selections DROP CONSTRAINT CHK_PACKAGE_OR_SPECIES');
        await queryRunner.dropTable('user_plant_selections');
    }
}
exports.CreateUserPlantSelectionsTable1700000000012 = CreateUserPlantSelectionsTable1700000000012;
//# sourceMappingURL=1700000000012-CreateUserPlantSelectionsTable.js.map