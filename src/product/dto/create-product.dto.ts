import { AutoMap } from '@automapper/classes';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
} from 'class-validator';
import { CreateProduct } from '../../types';

export class CreateProductDto implements CreateProduct {
  @AutoMap()
  @IsNotEmpty()
  @Length(1, 128)
  name: string;

  @AutoMap()
  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @AutoMap()
  @IsOptional()
  description?: string;

  @AutoMap()
  @IsNumberString()
  @IsOptional()
  promotionPrice?: number;

  @AutoMap()
  @IsOptional()
  isAvailable?: boolean;
}
