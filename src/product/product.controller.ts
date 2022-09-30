import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FindAllProductsResponse } from '../types';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('keyword') keyword: string,
  ): Promise<FindAllProductsResponse> {
    return await this.productService.findAll(take, skip, keyword);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }

  @Post(':id/images/:imageName')
  async addImageToProduct(
    @Param('id') id: string,
    @Param('imageName') imageName: string,
  ) {
    return this.productService.addImageToProduct(id, imageName);
  }

  @Delete(':id/images/:imageName')
  async removeImageFromProduct(
    @Param('id') id: string,
    @Param('imageName') imageName: string,
  ) {
    return this.productService.removeImageFromProduct(id, imageName);
  }
}
