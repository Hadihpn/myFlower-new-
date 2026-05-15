import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('shop_products')
@Index(['productType'])
@Index(['isActive'])

export class ShopProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'product_type', type: 'varchar', nullable: false })
  productType: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  // NOTE: In many DB drivers TypeORM returns decimals as string.
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: string;

  @Column({ name: 'image_url', type: 'varchar', nullable: true })
  imageUrl?: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
