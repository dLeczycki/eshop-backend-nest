import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Like } from 'typeorm';
import { DEFAULT_PRODUCT_SKIP, DEFAULT_PRODUCT_TAKE } from '../utils/constants';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Image } from '../image/entities/image.entity';
import { FindAllProductsResponse } from '../types';

@Injectable()
export class ProductService {
  constructor(@InjectMapper() private readonly classMapper: Mapper) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const sanitizedEntity = this.classMapper.map(
      createProductDto,
      CreateProductDto,
      Product,
    );

    const product = Product.create(sanitizedEntity);

    await product.save();
    return product;
  }

  async findAll(
    take = DEFAULT_PRODUCT_TAKE,
    skip = DEFAULT_PRODUCT_SKIP,
    keyword = '',
  ): Promise<FindAllProductsResponse> {
    const [products, total] = await Product.findAndCount({
      take,
      skip,
      where: [
        { name: Like(`%${keyword}%`) },
        { description: Like(`%${keyword}%`) },
      ],
    });

    return { products, total };
  }

  async findOne(id: string): Promise<Product> {
    return await Product.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await Product.findOne({ where: { id } });
    Object.seal(product);
    Object.assign(product, updateProductDto);

    await product.save();
    return product;
  }

  async remove(id: string): Promise<void> {
    const product = await Product.findOne({ where: { id } });
    await product.remove();
  }

  async addImageToProduct(id: string, imageName: string) {
    const product = await Product.findOne({ where: { id } });
    if (!product) throw new NotFoundException();

    const image = await Image.findOne({ where: { name: imageName } });
    if (!image) throw new NotFoundException();

    product.images = [...product.images, image];
    await product.save();
  }

  async removeImageFromProduct(id: string, imageName: string) {
    const product = await Product.findOne({ where: { id } });
    if (!product) throw new NotFoundException();

    const foundImage = await Image.findOne({ where: { name: imageName } });
    if (!foundImage) throw new NotFoundException();

    if (
      product.images.findIndex((image) => image.name === foundImage.name) < 0
    ) {
      throw new NotFoundException();
    }

    product.images = product.images.filter(
      (image) => image.name !== foundImage.name,
    );

    await product.save();
  }
}
