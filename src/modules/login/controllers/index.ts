import usersServices from '../../users/services';
import APIError from '../../../models/APIError';
import loginServices from '../services';

export const login: Controller = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new APIError(400, 'Please provide all required fields.');

  const user = await usersServices.getByEmail(email);

  if (!user) throw new APIError(401, 'Invalid credentials.');

  if (!loginServices.validatePassword(password, user.password))
    throw new APIError(401, 'Invalid credentials.');

  const token = loginServices.generateToken(user);

  return res.status(200).json({
    message: 'Login successful',
    data: {
      token
    }
  });
};
