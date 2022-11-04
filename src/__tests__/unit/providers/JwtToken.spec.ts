import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import { TokenProvider } from '../../../providers/interfaces/TokenProvider';
import { JwtToken } from '../../../providers/JwtToken';

describe('JwtToken', () => {
  const secret = 'secret';
  const tokenProvider: TokenProvider = new JwtToken(secret);
  const payload = {
    userId: '1',
    loginAt: new Date()
  };

  it('should generate a token', async () => {
    jest.spyOn(jwt, 'sign');

    const token = await tokenProvider.generateToken(payload);

    expect(jwt.sign).toHaveBeenCalledWith(payload, secret, {
      expiresIn: '7d'
    });
    expect(token).toBeDefined();
  });

  it('should return payload for valid token', async () => {
    jest.spyOn(jwt, 'verify');
    const token = await tokenProvider.generateToken(payload);

    const res: typeof payload = await tokenProvider.verifyToken(token);

    expect(res.userId).toEqual(payload.userId);
    expect(jwt.verify).toHaveBeenCalledWith(token, secret);
  });

  it('should throw an error for invalid token', async () => {
    jest.spyOn(jwt, 'verify');
    const token = 'invalid-token';

    try {
      await tokenProvider.verifyToken(token);
    } catch (error) {
      expect(error).toBeInstanceOf(JsonWebTokenError);
    }

    expect(jwt.verify).toHaveBeenCalledWith(token, secret);
  });
});
