import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('keyword') keyword: string,
  ) {
    return this.productService.findAll(take, skip, keyword);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);

    if (!product) throw new NotFoundException();

    return product;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
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
