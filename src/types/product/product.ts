import { EntityTracker } from '../entity';

export interface Product extends EntityTracker {
  id: string;
  name: string;
  price: number;
  description: string;
  promotionPrice: number;
  isAvailable: boolean;
}
