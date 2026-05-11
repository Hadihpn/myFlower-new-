"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FertilizerProduct = exports.ProductType = void 0;
const typeorm_1 = require("typeorm");
var ProductType;
(function (ProductType) {
    ProductType["NPK"] = "npk";
    ProductType["ORGANIC"] = "organic";
    ProductType["PESTICIDE"] = "pesticide";
})(ProductType || (exports.ProductType = ProductType = {}));
let FertilizerProduct = class FertilizerProduct {
};
exports.FertilizerProduct = FertilizerProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FertilizerProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], FertilizerProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ProductType }),
    __metadata("design:type", String)
], FertilizerProduct.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, name: 'npk_ratio', nullable: true }),
    __metadata("design:type", String)
], FertilizerProduct.prototype, "npkRatio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'active_ingredient', nullable: true }),
    __metadata("design:type", String)
], FertilizerProduct.prototype, "activeIngredient", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, name: 'recommended_dosage_per_liter', nullable: true }),
    __metadata("design:type", Number)
], FertilizerProduct.prototype, "recommendedDosagePerLiter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], FertilizerProduct.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], FertilizerProduct.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], FertilizerProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], FertilizerProduct.prototype, "updatedAt", void 0);
exports.FertilizerProduct = FertilizerProduct = __decorate([
    (0, typeorm_1.Entity)('fertilizer_products')
], FertilizerProduct);
//# sourceMappingURL=fertilizer-product.entity.js.map