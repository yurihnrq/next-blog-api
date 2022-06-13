import { IAuthRepository } from '../../repositories/interfaces/IAuthRepository';
import { ClientAuthService } from '../../services/ClientAuthService';
import { IClientAuthService } from '../../services/interfaces/IClientAuthService';
import { PrismaAuthRepositoryFactory } from '../../repositories/factories/PrismaAuthRepositoryFactory';
import { IHashProvider } from '@src/providers/interfaces/IHashProvider';
import { BCryptHashProvider } from '@src/providers/BCryptHashProvider';
import { IGenerateTokenService } from '../../services/interfaces/IGenerateTokenService';
import { GenerateTokenService } from '../../services/GenerateTokenService';
import { ITokenProvider } from '@src/providers/interfaces/ITokenProvider';
import { JwtTokenProvider } from '@src/providers/JwtTokenProvider';
import { AuthenticationController } from '../AuthenticationController';

export const AuthenticationControllerFactory = () => {
  const authRepository: IAuthRepository = PrismaAuthRepositoryFactory();

  const hashProvider: IHashProvider = new BCryptHashProvider();

  const clientAuthService: IClientAuthService = new ClientAuthService(
    authRepository,
    hashProvider
  );

  const tokenProvider: ITokenProvider = new JwtTokenProvider(
    process.env.JWT_SECRET as string
  );

  const generateTokenService: IGenerateTokenService = new GenerateTokenService(
    tokenProvider
  );

  return new AuthenticationController(clientAuthService, generateTokenService);
};
