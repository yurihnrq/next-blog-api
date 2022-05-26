import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../configs/prisma.config';

export const login: Controller = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide all required fields'
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    const loginInfo: ILoginInfo = {
      userId: user.id,
      loginAt: new Date().toISOString()
    };

    const token = jwt.sign(loginInfo, process.env.JWT_SECRET as string, {
      expiresIn: '1h'
    });

    return res.status(200).json({
      message: 'Login successful',
      data: {
        token
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong, please try again later.'
    });
  }
};
