import jwt from 'jsonwebtoken';
import { ILoginInfo, Middleware } from '../../types';

export const authJWT: Middleware = async (req, res, next) => {
  const {
    headers: { authorization: token }
  } = req;

  if (!token)
    return res.status(401).json({
      message: 'Unauthorized request'
    });

  const jwtToken = token.split(' ')[1];

  try {
    const loginInfo = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET as string
    ) as ILoginInfo;

    res.locals.userId = loginInfo.userId;
    res.locals.loginAt = loginInfo.loginAt;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized request'
    });
  }
};
