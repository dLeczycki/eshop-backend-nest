import { BaseEntity, Column, PrimaryColumn } from 'typeorm';
import { Image as ImageI } from '../../types';

export class Image extends BaseEntity implements ImageI {
  @PrimaryColumn({
    type: 'varchar',
    length: 64,
  })
  name: string;

  @Column()
  productId: string;
}
