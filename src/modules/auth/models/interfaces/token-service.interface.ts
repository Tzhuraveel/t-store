import { AuthTokens } from '../types/auth-token-response.type';
import { JwtPayload } from '../types/jwt-payload.type';

export interface TokenServiceInterface {
  generateAuthTokens(payload: JwtPayload): Promise<AuthTokens>;
}
