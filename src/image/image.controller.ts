import {
  Controller,
  HttpException,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { Product } from '../product/entities/product.entity';
import { UploadFiles } from '../types';
import { publicImageDir } from '../utils/storage';

@Controller('image')
export class ImageController {
  @Post('/product/:productId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'images',
          maxCount: 1,
        },
      ],
      {
        dest: publicImageDir(),
      },
    ),
  )
  async uploadProductImage(
    @Param('productId') productId: string,
    @UploadedFiles() files: UploadFiles,
  ) {
    const image = files?.images[0] ?? null;

    try {
      const product = await Product.findOne(productId);

      if (!product) throw new HttpException('', 404);
    } catch (e) {
      if (image) fs.unlinkSync(path.join(publicImageDir(), image.filename));
      throw e;
    }
  }
}
