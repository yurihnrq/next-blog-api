import { IAuthRepository } from '../../repositories/interfaces/IAuthRepository';
import { ClientAuth } from '../../services/ClientAuth';
import { ClientAuthService } from '../../services/interfaces/ClientAuthService';
import { PrismaAuthRepositoryFactory } from '../../repositories/factories/PrismaAuthRepositoryFactory';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { BCryptHashProvider } from '@src/providers/BCryptHashProvider';
import { GenerateTokenService } from '../../services/interfaces/GenerateTokenService';
import { GenerateToken } from '../../services/GenerateTokenService';
import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { JwtTokenProvider } from '@src/providers/JwtTokenProvider';
import { AuthenticationController } from '../AuthenticationController';

export const AuthenticationControllerFactory = () => {
  const authRepository: IAuthRepository = PrismaAuthRepositoryFactory();

  const hashProvider: HashProvider = new BCryptHashProvider();

  const clientAuthService: ClientAuthService = new ClientAuth(
    authRepository,
    hashProvider
  );

  const tokenProvider: TokenProvider = new JwtTokenProvider(
    process.env.JWT_SECRET as string
  );

  const generateTokenService: GenerateTokenService = new GenerateToken(
    tokenProvider
  );

  return new AuthenticationController(clientAuthService, generateTokenService);
};
