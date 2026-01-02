"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlantPackageItemsTable1700000000008 = void 0;
const typeorm_1 = require("typeorm");
class CreatePlantPackageItemsTable1700000000008 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'plant_package_items',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'package_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'plant_species_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'position',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('plant_package_items', new typeorm_1.TableForeignKey({
            columnNames: ['package_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'plant_packages',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('plant_package_items', new typeorm_1.TableForeignKey({
            columnNames: ['plant_species_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'plant_species',
            onDelete: 'CASCADE',
        }));
        await queryRunner.createIndex('plant_package_items', new typeorm_1.TableIndex({
            name: 'IDX_PACKAGE_SPECIES_UNIQUE',
            columnNames: ['package_id', 'plant_species_id'],
            isUnique: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('plant_package_items', 'IDX_PACKAGE_SPECIES_UNIQUE');
        const table = await queryRunner.getTable('plant_package_items');
        const foreignKeys = table.foreignKeys;
        for (const foreignKey of foreignKeys) {
            await queryRunner.dropForeignKey('plant_package_items', foreignKey);
        }
        await queryRunner.dropTable('plant_package_items');
    }
}
exports.CreatePlantPackageItemsTable1700000000008 = CreatePlantPackageItemsTable1700000000008;
//# sourceMappingURL=1700000000008-CreatePlantPackageItemsTable.js.map