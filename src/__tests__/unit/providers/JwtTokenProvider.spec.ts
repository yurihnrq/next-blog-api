import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import { ITokenProvider } from '../../../providers/interfaces/ITokenProvider';
import { JwtTokenProvider } from '../../../providers/JwtTokenProvider';

describe('JwtTokenProvider', () => {
  const secret = 'secret';
  const tokenProvider: ITokenProvider = new JwtTokenProvider(secret);
  const payload = {
    userId: '1',
    loginAt: new Date()
  };

  it('should generate a token', () => {
    jest.spyOn(jwt, 'sign');

    const token = tokenProvider.generateToken(payload);

    expect(jwt.sign).toHaveBeenCalledWith(payload, secret, {
      expiresIn: '1h'
    });
    expect(token).toBeDefined();
  });

  it('should return payload for valid token', () => {
    jest.spyOn(jwt, 'verify');
    const token = tokenProvider.generateToken(payload);

    const res: typeof payload = tokenProvider.verifyToken(token);

    expect(res.userId).toEqual(payload.userId);
    expect(jwt.verify).toHaveBeenCalledWith(token, secret);
  });

  it('should throw an error for invalid token', () => {
    jest.spyOn(jwt, 'verify');
    const token = 'invalid-token';

    try {
      tokenProvider.verifyToken(token);
    } catch (error) {
      expect(error).toBeInstanceOf(JsonWebTokenError);
    }

    expect(jwt.verify).toHaveBeenCalledWith(token, secret);
  });
});
