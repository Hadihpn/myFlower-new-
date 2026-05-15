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
exports.ShopProduct = void 0;
const typeorm_1 = require("typeorm");
let ShopProduct = class ShopProduct {
};
exports.ShopProduct = ShopProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ShopProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], ShopProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_type', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], ShopProduct.prototype, "productType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ShopProduct.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", String)
], ShopProduct.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ShopProduct.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ShopProduct.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ShopProduct.prototype, "createdAt", void 0);
exports.ShopProduct = ShopProduct = __decorate([
    (0, typeorm_1.Entity)('shop_products'),
    (0, typeorm_1.Index)(['productType']),
    (0, typeorm_1.Index)(['isActive'])
], ShopProduct);
//# sourceMappingURL=shop-product.entity.js.map