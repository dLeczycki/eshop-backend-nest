import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  create(image: Express.Multer.File, productId: string) {
    throw new Error('Method not implemented.');
  }
}
