import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Catch()
export class FileExceptionFilter implements ExceptionFilter {
  catch(host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const files = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    for (const key in files) {
      for (const file of files[key]) {
        fs.unlinkSync(path.join((file as unknown as Express.Multer.File).path));
      }
    }

    return response.status(HttpStatus.BAD_REQUEST);
  }
}
