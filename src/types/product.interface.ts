import { EntityTracker } from './entity.interface';

export interface CreateProduct {
  name: string;
  price: number;
  promotionPrice?: number;
  description?: string;
  isAvailable?: boolean;
}

export interface Product extends CreateProduct, EntityTracker {
  id: string;
  isAvailable: boolean;
}

export interface FindAllProductsResponse {
  products: Product[];
  total: number;
}
