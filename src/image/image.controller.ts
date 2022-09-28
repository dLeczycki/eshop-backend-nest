import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileExceptionFilter } from '../filters/file-exception.filter';
import { GlobalExceptionFilter } from '../filters/global-exception.filter';
import { UploadFiles } from '../types';
import { saveMulterFileWithExtension, publicImageDir } from '../utils/storage';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async findAll() {
    return this.imageService.findAll();
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'images',
          maxCount: 1,
        },
      ],
      {
        storage: saveMulterFileWithExtension(publicImageDir()),
      },
    ),
  )
  @UseFilters(GlobalExceptionFilter, FileExceptionFilter)
  async uploadImage(@UploadedFiles() files: UploadFiles) {
    const image = files?.images[0] ?? null;

    return this.imageService.create(image);
  }

  @Delete('/:name')
  async removeImage(@Param('name') name: string) {
    return this.imageService.remove(name);
  }
}
