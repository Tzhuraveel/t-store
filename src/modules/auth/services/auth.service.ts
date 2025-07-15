import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';

import { PasswordHelper } from '#common/helpers/password.helper';
import { Environment } from '#common/models/enums/app.enum';
import { APP_CONFIG_SERVICE } from '#config/app/app-config.constants';
import { AppConfigService } from '#config/app/app-config.service';
import { USER_SERVICE } from '#modules/user/models/constants/user.constants';
import { UserData } from '#modules/user/models/types/user-data.type';
import { UserService } from '#modules/user/services/user.service';

import { TOKEN_SERVICE } from '../models/constants/auth.constants';
import { SignUpRequestDto } from '../models/dtos/request/sign-up-request.dto copy';
import { TokensResponseDto } from '../models/dtos/response/tokens-response.dto';
import { AuthServiceInterface } from '../models/interfaces/auth-service.interface';
import { JwtPayload } from '../models/types/jwt-payload.type';
import { TokenService } from './token.service';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
    @Inject(APP_CONFIG_SERVICE)
    private readonly appConfigService: AppConfigService,
  ) {}

  async signIn(userData: UserData): Promise<TokensResponseDto> {
    const payload: JwtPayload = {
      userId: userData.userId,
    };

    const tokens = await this.tokenService.generateAuthTokens(payload);

    return tokens;
  }

  async signUp(dto: SignUpRequestDto): Promise<TokensResponseDto> {
    const { email, password } = dto;

    await this.userService.ensureEmailIsUnique(email);

    const passwordHash = await PasswordHelper.hashPassword(password);

    const user = await this.userService.create({ email, passwordHash });

    const payload: JwtPayload = {
      userId: user.id,
    };

    const tokens = await this.tokenService.generateAuthTokens(payload);

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
