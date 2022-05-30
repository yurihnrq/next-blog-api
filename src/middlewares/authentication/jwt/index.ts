import jwt from 'jsonwebtoken';
import APIError from '../../../models/APIError';

const authJWT: Middleware = async (req, res, next) => {
  const {
    headers: { authorization: token }
  } = req;

  if (!token)
    throw new APIError(401, 'You must be logged in to access this resource.');

  const jwtToken = token.split(' ')[1];

  const loginInfo = jwt.verify(
    jwtToken,
    process.env.JWT_SECRET as string
  ) as ILoginInfo;

  res.locals.userId = loginInfo.userId;
  res.locals.loginAt = loginInfo.loginAt;

  return next();
};

export default authJWT;
