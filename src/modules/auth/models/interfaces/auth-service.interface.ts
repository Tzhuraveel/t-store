import { Response } from 'express';

import { UserData } from '#modules/user/models/types/user-data.type';

import { SignUpRequestDto } from '../dtos/request/sign-up-request.dto copy';
import { TokensResponseDto } from '../dtos/response/tokens-response.dto';

export interface AuthServiceInterface {
  signIn(userData: UserData): Promise<TokensResponseDto>;
  signUp(dto: SignUpRequestDto): Promise<TokensResponseDto>;
  refresh(userData: UserData): Promise<TokensResponseDto>;
  setRefreshTokenCookie(res: Response, token: string): Promise<void>;
}
