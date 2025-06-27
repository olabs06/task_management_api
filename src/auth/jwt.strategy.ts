import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtStrategyBase } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
  constructor(configService: ConfigService) {
    const extractJwt = ExtractJwt.fromAuthHeaderAsBearerToken() as (
      req: Request
    ) => string | null;

    super({
      jwtFromRequest: extractJwt,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret',
    });
  }

  validate(payload: JwtPayload): { id: string; username: string } {
    return { id: payload.sub, username: payload.username };
  }
}
