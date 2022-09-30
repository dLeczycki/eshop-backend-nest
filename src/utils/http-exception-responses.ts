import { HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from '../types';

export const NOT_FOUND_EXCEPTION_RESPONSE: ExceptionResponse = {
  status: HttpStatus.NOT_FOUND,
  message: 'Nie odnaleziono zasobu',
};

export const BAD_REQUEST_EXCEPTION_RESPONSE: ExceptionResponse = {
  status: HttpStatus.BAD_REQUEST,
  message: 'Nieprawidłowe żądanie',
};

export const UNAUTHORIZED_EXCEPTION_RESPONSE: ExceptionResponse = {
  status: HttpStatus.UNAUTHORIZED,
  message: 'Nie masz uprawnień do zasobu',
};

export const INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE: ExceptionResponse = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  message: 'Uuups.. coś poszło nie tak.. Spróbuj ponownie za kilka minut',
};
