"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlantPackagesTable1700000000007 = void 0;
const typeorm_1 = require("typeorm");
class CreatePlantPackagesTable1700000000007 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'plant_packages',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'description',
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
                    name: 'plant_count',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'thresholds',
                    type: 'json',
                    isNullable: false,
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: true,
                },
                {
                    name: 'image_url',
                    type: 'varchar',
                    length: '500',
                    isNullable: true,
                },
                {
                    name: 'popular',
                    type: 'boolean',
                    default: false,
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('plant_packages');
    }
}
exports.CreatePlantPackagesTable1700000000007 = CreatePlantPackagesTable1700000000007;
//# sourceMappingURL=1700000000007-CreatePlantPackagesTable.js.map