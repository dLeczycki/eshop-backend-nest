import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../image/entities/image.entity';
import { Product as ProductI } from '../../types';

@Entity()
export class Product extends BaseEntity implements ProductI {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({
    type: 'varchar',
    length: '128',
    unique: true,
  })
  name: string;

  @AutoMap()
  @Column({
    type: 'text',
  })
  description: string;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 7,
    scale: 2,
  })
  price: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 7,
    scale: 2,
    default: null,
  })
  promotionPrice: number;

  @AutoMap()
  @Column({
    type: 'boolean',
    default: true,
  })
  isAvailable: boolean;

  @AutoMap()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToMany(() => Image, (entity) => entity.products, { eager: true })
  @JoinTable({
    name: 'product_images',
  })
  images: Image[];
}
