import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductProfile } from './product.profile';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductProfile],
})
export class ProductModule {}
