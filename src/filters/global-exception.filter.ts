import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message;

    switch (status) {
      case HttpStatus.NOT_FOUND:
        message = 'Nie odnaleziono zasobu';
        break;
      case HttpStatus.BAD_REQUEST:
        message = 'Nieprawidłowe żądanie';
        break;
      case HttpStatus.UNAUTHORIZED:
        message = 'Nie masz uprawnień do zasobu';
      case HttpStatus.INTERNAL_SERVER_ERROR:
      default:
        message =
          'Uuups.. coś poszło nie tak.. Spróbuj ponownie za kilka minut';
    }

    console.log(`ERROR ${status}: ${exception}`);
    response.status(status).json({
      status,
      message,
    });
  }
}
