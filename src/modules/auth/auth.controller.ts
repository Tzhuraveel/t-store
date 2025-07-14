import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';

import { UserData } from '#modules/user/models/types/user-data.type';

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AUTH_SERVICE } from './models/constants/auth.constants';
import { SignInRequestDto } from './models/dtos/request/sign-in-request.dto';
import { SignUpRequestDto } from './models/dtos/request/sign-up-request.dto copy';
import { TokensResponseDto } from './models/dtos/response/tokens-response.dto';
import { AuthServiceInterface } from './models/interfaces/auth-service.interface';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) {}

  @Post('sign-in')
  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Body() _dto: SignInRequestDto,
    @CurrentUser() user: UserData,
  ): Promise<TokensResponseDto> {
    return await this.authService.signIn(user);
  }

  @Post('sign-up')
  @SkipAuth()
  async signUp(@Body() dto: SignUpRequestDto): Promise<TokensResponseDto> {
    return await this.authService.signUp(dto);
  }

  @Post('refresh')
  @SkipAuth()
  @UseGuards(RefreshTokenGuard)
  async refresh(@CurrentUser() user: UserData): Promise<TokensResponseDto> {
    return await this.authService.refresh(user);
  }
}
