import { ClientAuthDTO } from '../../interfaces/ClientAuthDTO';
import { AuthInfo } from './AuthInfo';

export interface ClientAuthService {
  execute(data: ClientAuthDTO): Promise<AuthInfo>;
}
