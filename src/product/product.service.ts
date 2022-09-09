import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  async create(createProductDto: CreateProductDto) {
    const product = Product.create();
    Object.assign(product, createProductDto);

    await product.save();
    return product;
  }

  async findAll() {
    return await Product.find();
  }

  async findOne(id: string) {
    return await Product.findOne({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await Product.findOne({ where: { id } });
    Object.assign(product, updateProductDto);

    await product.save();
    return product;
  }

  async remove(id: string) {
    const product = await Product.findOne({ where: { id } });
    await product.remove();
  }
}
