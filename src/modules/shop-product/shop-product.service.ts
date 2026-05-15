import { Injectable } from '@nestjs/common';
import { CreateShopProductDto } from './dto/create-shop-product.dto';
import { UpdateShopProductDto } from './dto/update-shop-product.dto';

@Injectable()
export class ShopProductService {
  create(createShopProductDto: CreateShopProductDto) {
    return 'This action adds a new shopProduct';
  }

  findAll() {
    return `This action returns all shopProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shopProduct`;
  }

  update(id: number, updateShopProductDto: UpdateShopProductDto) {
    return `This action updates a #${id} shopProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopProduct`;
  }
}
