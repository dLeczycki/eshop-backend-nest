import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Image as ImageI } from '../../types';

@Entity()
export class Image extends BaseEntity implements ImageI {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 5,
  })
  extension: string;

  @ManyToMany(() => Product, (entity) => entity.images)
  products: Product[];
}
