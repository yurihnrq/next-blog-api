import { AuthRepository } from '../../repositories/interfaces/AuthRepository';
import { ClientAuth } from '../../services/ClientAuth';
import { ClientAuthService } from '../../services/interfaces/ClientAuthService';
import { PrismaAuthRepositoryFactory } from '../../repositories/factories/PrismaAuthRepositoryFactory';
import { HashProvider } from '@src/providers/interfaces/HashProvider';
import { BCryptHash } from '@src/providers/BCryptHash';
import { GenerateTokenService } from '../../services/interfaces/GenerateTokenService';
import { GenerateToken } from '../../services/GenerateTokenService';
import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { JwtToken } from '@src/providers/JwtToken';
import { AuthenticationController } from '../AuthenticationController';

export const AuthenticationControllerFactory = () => {
  const authRepository: AuthRepository = PrismaAuthRepositoryFactory();

  const hashProvider: HashProvider = new BCryptHash();

  const clientAuthService: ClientAuthService = new ClientAuth(
    authRepository,
    hashProvider
  );

  const tokenProvider: TokenProvider = new JwtToken(
    process.env.JWT_SECRET as string
  );

  const generateTokenService: GenerateTokenService = new GenerateToken(
    tokenProvider
  );

  return new AuthenticationController(clientAuthService, generateTokenService);
};
