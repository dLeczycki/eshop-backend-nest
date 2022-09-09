import { EntityTracker } from './entity.interface';

export interface CreateProduct {
  name: string;
  price: number;
  description: string;
  promotionPrice: number;
  isAvailable: boolean;
}

export interface Product extends CreateProduct, EntityTracker {
  id: string;
}
