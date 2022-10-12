import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from '../config/config';
import { UserService } from '../user/user.service';

export interface JwtPayload {
  tokenId: string;
}

function cookieExtractor(req: Request): null | string {
  return req && req.cookies ? req.cookies?.token ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: config.jwt.secret,
      ignoreExpiration: false,
    });
  }

  async validate(
    payload: JwtPayload,
    done: (err: unknown, user: unknown) => void,
  ) {
    if (!payload || !payload.tokenId) {
      return done(new UnauthorizedException(), false);
    }

    const user = await this.userService.findOne({
      tokenId: payload.tokenId,
    });

    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
