import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

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

  async findAll(): Promise<Product[]> {
    return await Product.find();
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
}
