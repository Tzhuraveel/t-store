import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AUTH_CONFIG_SERVICE } from '#config/auth/auth-config.constants';
import { AuthConfigService } from '#config/auth/auth-config.service';
import { UserMapper } from '#modules/user/helpers/user-mapper.helper';
import { USER_REPOSITORY } from '#modules/user/models/constants/user.constants';
import { UserData } from '#modules/user/models/types/user-data.type';
import { UserRepository } from '#modules/user/services/user.repository';

import { JwtPayload } from '../models/types/jwt-payload.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(AUTH_CONFIG_SERVICE)
    private readonly authConfigService: AuthConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfigService.refreshTokenSecret,
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload): Promise<UserData> {
    const user = await this.userRepository.findOneById(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return UserMapper.toData(user);
  }
}
