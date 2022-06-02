import APIError from '../../../models/APIError';
import { IUsersServices } from '../../users/interfaces';
import { ILoginControllers, ILoginServices } from '../interfaces';

export class LoginControllers implements ILoginControllers {
  #services: ILoginServices;
  #usersServices: IUsersServices;

  constructor(services: ILoginServices, usersServices: IUsersServices) {
    this.#usersServices = usersServices;
    this.#services = services;
  }

  login: Controller = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      throw new APIError(400, 'Please provide all required fields.');

    const user = await this.#usersServices.getByEmail(email);

    if (!user) throw new APIError(401, 'Invalid credentials.');

    if (!this.#services.validatePassword(password, user.password))
      throw new APIError(401, 'Invalid credentials.');

    const token = this.#services.generateToken(user);

    return res.status(200).json({
      message: 'Login successful',
      data: {
        token
      }
    });
  };
}
