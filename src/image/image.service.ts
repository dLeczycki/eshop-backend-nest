import { Injectable, NotFoundException } from '@nestjs/common';
import { Image } from './entities/image.entity';
import * as fs from 'fs';
import * as path from 'path';
import { DEFAULT_IMAGE_SKIP, DEFAULT_IMAGE_TAKE } from '../utils/constants';
import { publicImageDir } from '../utils/storage';

@Injectable()
export class ImageService {
  async findAll(
    take = DEFAULT_IMAGE_TAKE,
    skip = DEFAULT_IMAGE_SKIP,
  ): Promise<{ images: Image[]; total: number }> {
    const [images, total] = await Image.findAndCount({
      take,
      skip,
    });

    return { images, total };
  }

  async create(image: Express.Multer.File) {
    const imageToAdd = await Image.create();
    imageToAdd.name = path.basename(image.filename);
    imageToAdd.extension = path.extname(image.filename);

    await imageToAdd.save();

    return imageToAdd;
  }

  async remove(name: string) {
    const image = await Image.findOne({ where: { name } });

    if (!image) throw new NotFoundException();
    fs.unlinkSync(
      path.join(publicImageDir(), `${image.name}${image.extension}`),
    );

    await image.remove();
  }
}
