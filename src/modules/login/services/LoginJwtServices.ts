import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../../users/interfaces';
import { ILoginServices } from '../interfaces';

export class LoginJwtServices implements ILoginServices {
  generateToken = (user: IUser) => {
    const token = jwt.sign(
      {
        userId: user?.id,
        loginAt: new Date().toISOString()
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h'
      }
    );

    return token;
  };

  validatePassword = (password: string, userPassword: string) => {
    return bcrypt.compareSync(password, userPassword);
  };
}
