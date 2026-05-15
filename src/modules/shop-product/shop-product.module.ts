import { Module } from '@nestjs/common';
import { ShopProductService } from './shop-product.service';
import { ShopProductController } from './shop-product.controller';

@Module({
  controllers: [ShopProductController],
  providers: [ShopProductService],
})
export class ShopProductModule {}
