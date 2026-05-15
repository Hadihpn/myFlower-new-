import { CreateShopProductDto } from './dto/create-shop-product.dto';
import { UpdateShopProductDto } from './dto/update-shop-product.dto';
export declare class ShopProductService {
    create(createShopProductDto: CreateShopProductDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateShopProductDto: UpdateShopProductDto): string;
    remove(id: number): string;
}
