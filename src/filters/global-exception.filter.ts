import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  BAD_REQUEST_EXCEPTION_RESPONSE,
  INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE,
  NOT_FOUND_EXCEPTION_RESPONSE,
  UNAUTHORIZED_EXCEPTION_RESPONSE,
} from '../utils/http-exception-responses';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message;

    if (status < 500 && exception.message) message = exception.message;
    else {
      switch (status) {
        case NOT_FOUND_EXCEPTION_RESPONSE.status:
          message = NOT_FOUND_EXCEPTION_RESPONSE.message;
          break;
        case BAD_REQUEST_EXCEPTION_RESPONSE.status:
          message = BAD_REQUEST_EXCEPTION_RESPONSE.message;
          break;
        case UNAUTHORIZED_EXCEPTION_RESPONSE.status:
          message = UNAUTHORIZED_EXCEPTION_RESPONSE.message;
        case INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE.status:
        default:
          message = INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE.message;
      }
    }

    console.log(`ERROR ${status}: ${exception}`);
    console.log(exception);
    response.status(status).json({
      status,
      message,
    });
  }
}
