import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  departmentId?: string | null;
}

export class TokenUtil {
  static generate(payload: TokenPayload): string {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn as any
    });
  }

  static verify(token: string): TokenPayload {
    return jwt.verify(token, config.jwtSecret) as TokenPayload;
  }
}
