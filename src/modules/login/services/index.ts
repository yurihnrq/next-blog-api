import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (user: User) => {
  const token = jwt.sign(
    {
      userId: user.id,
      loginAt: new Date().toISOString()
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1h'
    }
  );

  return token;
};

const validatePassword = (password: string, userPassword: string) => {
  return bcrypt.compareSync(password, userPassword);
};

const loginServices = {
  generateToken,
  validatePassword
};

export default loginServices;
