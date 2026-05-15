import { ShopProductService } from './shop-product.service';
import { CreateShopProductDto } from './dto/create-shop-product.dto';
import { UpdateShopProductDto } from './dto/update-shop-product.dto';
export declare class ShopProductController {
    private readonly shopProductService;
    constructor(shopProductService: ShopProductService);
    create(createShopProductDto: CreateShopProductDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateShopProductDto: UpdateShopProductDto): string;
    remove(id: string): string;
}
