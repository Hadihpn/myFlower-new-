// src/shop-products/dto/create-shop-product.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsUrl, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShopProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Product type (e.g., fertilizer, pesticide)' })
  @IsString()
  product_type: string;

  @ApiPropertyOptional({ description: 'Product description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Product price', example: 29.99 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({ description: 'Product image URL' })
  @IsOptional()
  @IsUrl()
  image_url?: string;

  @ApiPropertyOptional({ description: 'Is product active', default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
