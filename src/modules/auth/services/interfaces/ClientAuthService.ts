import { ClientAuthDTO } from '../../interfaces/ClientAuthDTO';
import { AuthInfo } from '../../../common/interfaces/AuthInfo';

export interface ClientAuthService {
  execute(data: ClientAuthDTO): Promise<AuthInfo>;
}
