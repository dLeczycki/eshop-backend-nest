import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message;

    switch (status) {
      case 404:
        message = 'Nie odnaleziono zasobu';
        break;
      case 400:
        message = 'Nieprawidłowe żądanie';
        break;
      case 403:
        message = 'Nie masz uprawnień do zasobu';
      case 500:
      default:
        message =
          'Uuups.. coś poszło nie tak.. Spróbuj ponownie za kilka minut';
    }

    response.status(status).json({
      status,
      message,
    });
  }
}
