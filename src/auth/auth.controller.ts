import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { config } from '../config/config';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserFromRequest } from './user-from-request.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() requestBody: LoginDto, @Res() response: Response) {
    const { user, jwtToken } = await this.authService.login(requestBody);

    return response
      .status(HttpStatus.CREATED)
      .cookie('token', jwtToken, {
        secure: config.https_enabled,
        httpOnly: config.https_enabled,
        domain: config.domain,
      })
      .cookie('test-cookie', 'test-value')
      .json({
        status: HttpStatus.CREATED,
        message: 'Logowanie pomyślne',
        user,
      });
  }

  @Post('/register')
  async register(@Body() requestBody: RegisterDto, @Res() response: Response) {
    await this.authService.register(requestBody);

    return response.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Użytkownik został zarejestrowany',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logout(@UserFromRequest() user: User, @Res() response: Response) {
    await this.authService.logout(user);

    return response
      .clearCookie('token', {
        secure: config.https_enabled,
        httpOnly: config.https_enabled,
        domain: config.domain,
      })
      .json({
        status: HttpStatus.CREATED,
        message: 'Wylogowano pomyślnie',
      });
  }
}
