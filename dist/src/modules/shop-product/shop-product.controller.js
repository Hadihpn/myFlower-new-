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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopProductController = void 0;
const common_1 = require("@nestjs/common");
const shop_product_service_1 = require("./shop-product.service");
const create_shop_product_dto_1 = require("./dto/create-shop-product.dto");
const update_shop_product_dto_1 = require("./dto/update-shop-product.dto");
let ShopProductController = class ShopProductController {
    constructor(shopProductService) {
        this.shopProductService = shopProductService;
    }
    create(createShopProductDto) {
        return this.shopProductService.create(createShopProductDto);
    }
    findAll() {
        return this.shopProductService.findAll();
    }
    findOne(id) {
        return this.shopProductService.findOne(+id);
    }
    update(id, updateShopProductDto) {
        return this.shopProductService.update(+id, updateShopProductDto);
    }
    remove(id) {
        return this.shopProductService.remove(+id);
    }
};
exports.ShopProductController = ShopProductController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shop_product_dto_1.CreateShopProductDto]),
    __metadata("design:returntype", void 0)
], ShopProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShopProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shop_product_dto_1.UpdateShopProductDto]),
    __metadata("design:returntype", void 0)
], ShopProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShopProductController.prototype, "remove", null);
exports.ShopProductController = ShopProductController = __decorate([
    (0, common_1.Controller)('shop-product'),
    __metadata("design:paramtypes", [shop_product_service_1.ShopProductService])
], ShopProductController);
//# sourceMappingURL=shop-product.controller.js.map