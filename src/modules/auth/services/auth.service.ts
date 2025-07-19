import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Response } from 'express';

import { USER_SIGNED_UP } from '#common/events/constants';
import { PasswordHelper } from '#common/helpers/password.helper';
import { Environment } from '#common/models/enums/app.enum';
import { APP_CONFIG_SERVICE } from '#config/app/app-config.constants';
import { AppConfigService } from '#config/app/app-config.service';
import { USER_SERVICE } from '#modules/user/models/constants/user.constants';
import { UserServiceInterface } from '#modules/user/models/interfaces/user-service.interface';
import { UserData } from '#modules/user/models/types/user-data.type';

import { TOKEN_SERVICE } from '../models/constants/auth.constants';
import { SignUpRequestDto } from '../models/dtos/request/sign-up-request.dto copy';
import { TokensResponseDto } from '../models/dtos/response/tokens-response.dto';
import { AuthServiceInterface } from '../models/interfaces/auth-service.interface';
import { TokenServiceInterface } from '../models/interfaces/token-service.interface';
import { JwtPayload } from '../models/types/jwt-payload.type';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenServiceInterface,
    @Inject(APP_CONFIG_SERVICE)
    private readonly appConfigService: AppConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async signIn(userData: UserData): Promise<TokensResponseDto> {
    const payload: JwtPayload = {
      userId: userData.userId,
    };

    const tokens = await this.tokenService.generateAuthTokens(payload);

    return tokens;
  }

  async signUp(dto: SignUpRequestDto): Promise<TokensResponseDto> {
    const { email, password, firstName, lastName } = dto;

    await this.userService.ensureEmailIsUnique(email);

    const passwordHash = await PasswordHelper.hashPassword(password);

    const user = await this.userService.create({
      email,
      passwordHash,
      firstName,
      lastName,
    });

    const payload: JwtPayload = {
      userId: user.id,
    };

    const tokens = await this.tokenService.generateAuthTokens(payload);

    this.eventEmitter.emit(USER_SIGNED_UP, {
      email: user.email,
      firstName,
      lastName,
    });

    return tokens;
  }

  async refresh(userData: UserData): Promise<TokensResponseDto> {
    const { userId } = userData;

    const payload: JwtPayload = {
      userId,
    };

    const tokens = await this.tokenService.generateAuthTokens(payload);

    return tokens;
  }

  async setRefreshTokenCookie(res: Response, token: string): Promise<void> {
    const isProd = this.appConfigService.environment === Environment.PRODUCTION;

    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'lax' : 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/auth',
    });
  }
}
