"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlantGroupsTable1700000000005 = void 0;
const typeorm_1 = require("typeorm");
class CreatePlantGroupsTable1700000000005 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'plant_groups',
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
                    name: 'thresholds',
                    type: 'json',
                    isNullable: false,
                },
                {
                    name: 'care_instructions',
                    type: 'json',
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('plant_groups');
    }
}
exports.CreatePlantGroupsTable1700000000005 = CreatePlantGroupsTable1700000000005;
//# sourceMappingURL=1700000000005-CreatePlantGroupsTable.js.map