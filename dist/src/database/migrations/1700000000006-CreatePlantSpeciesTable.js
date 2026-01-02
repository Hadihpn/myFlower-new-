"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlantSpeciesTable1700000000006 = void 0;
const typeorm_1 = require("typeorm");
class CreatePlantSpeciesTable1700000000006 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'plant_species',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'group_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'scientific_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'common_names',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'category',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'difficulty',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'thresholds',
                    type: 'json',
                    isNullable: false,
                },
                {
                    name: 'watering',
                    type: 'json',
                    isNullable: false,
                },
                {
                    name: 'fertilization',
                    type: 'json',
                    isNullable: false,
                },
                {
                    name: 'growth_info',
                    type: 'json',
                    isNullable: false,
                },
                {
                    name: 'harvest_info',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'common_problems',
                    type: 'json',
                    isNullable: false,
                },
                {
                    name: 'companion_plants',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'avoid_plants',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'toxicity',
                    type: 'json',
                    isNullable: false,
                },
                {
                    name: 'tips',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'image_url',
                    type: 'varchar',
                    length: '500',
                    isNullable: true,
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createForeignKey('plant_species', new typeorm_1.TableForeignKey({
            columnNames: ['group_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'plant_groups',
            onDelete: 'SET NULL',
        }));
        await queryRunner.createIndex('plant_species', new typeorm_1.TableIndex({
            name: 'IDX_PLANT_SPECIES_CATEGORY',
            columnNames: ['category'],
        }));
        await queryRunner.createIndex('plant_species', new typeorm_1.TableIndex({
            name: 'IDX_PLANT_SPECIES_NAME',
            columnNames: ['name'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('plant_species', 'IDX_PLANT_SPECIES_NAME');
        await queryRunner.dropIndex('plant_species', 'IDX_PLANT_SPECIES_CATEGORY');
        const table = await queryRunner.getTable('plant_species');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('group_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('plant_species', foreignKey);
        }
        await queryRunner.dropTable('plant_species');
    }
}
exports.CreatePlantSpeciesTable1700000000006 = CreatePlantSpeciesTable1700000000006;
//# sourceMappingURL=1700000000006-CreatePlantSpeciesTable.js.map