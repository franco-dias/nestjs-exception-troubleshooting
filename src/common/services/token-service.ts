export const TokenServiceToken = 'TokenService';

export interface TokenService {
  sign(
    payload: any,
    config: {
      algorithm: string;
      secret: string;
      expiresIn: string;
    },
  ): string;
}
