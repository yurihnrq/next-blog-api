import { IUser } from '../../users/interfaces';

export interface ILoginServices {
  generateToken: (user: IUser) => string;
  validatePassword: (password: string, userPassword: string) => boolean;
}
