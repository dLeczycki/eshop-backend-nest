import { CreateProduct } from '../../types';

export class CreateProductDto implements CreateProduct {
  name: string;
  price: number;
  description: string;
  promotionPrice: number;
  isAvailable: boolean;
}
