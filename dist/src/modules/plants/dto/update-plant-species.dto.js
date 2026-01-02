"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlantSpeciesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_plant_species_dto_1 = require("./create-plant-species.dto");
class UpdatePlantSpeciesDto extends (0, swagger_1.PartialType)(create_plant_species_dto_1.CreatePlantSpeciesDto) {
}
exports.UpdatePlantSpeciesDto = UpdatePlantSpeciesDto;
//# sourceMappingURL=update-plant-species.dto.js.map