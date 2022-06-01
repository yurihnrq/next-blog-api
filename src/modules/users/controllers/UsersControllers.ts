import APIError from '../../../models/APIError';
import { IUser, IUsersControllers, IUsersServices } from '../interfaces';

export class UsersControllers implements IUsersControllers {
  #usersServices: IUsersServices;

  constructor(usersServices: IUsersServices) {
    this.#usersServices = usersServices;
  }

  getUserById: Controller = async (req, res) => {
    const { id } = req.params;

    const user = await this.#usersServices.getById(id);

    if (!user) throw new APIError(404, 'User not found.');

    return res.status(200).json({
      message: 'User fetched successfully.',
      data: user
    });
  };

  getAllUsers: Controller = async (req, res) => {
    const { page } = req.query;

    const pageInt = page ? parseInt(page as string) : 1;

    const users = await this.#usersServices.getAll(pageInt);

    if (users.length <= 0)
      throw new APIError(404, 'There are no users registered.');

    return res.status(200).json({
      message: 'Users fetched successfully.',
      data: users
    });
  };

  createUser: Controller = async (req, res) => {
    const { name, email, password, birthDate, biography } = req.body as IUser;

    const user = await this.#usersServices.getByEmail(email);

    if (user)
      throw new APIError(409, 'User with provided email already exists.');

    await this.#usersServices.create({
      name,
      email,
      password,
      birthDate: birthDate as string,
      biography
    });

    return res.status(201).json({
      message: 'User created successfully.'
    });
  };

  deleteUser: Controller = async (req, res) => {
    const { id } = req.params;

    const user = await this.#usersServices.getById(id);

    if (!user) throw new APIError(404, 'User not found.');

    await this.#usersServices.remove(id);

    return res.status(200).json({
      message: 'User deleted successfully'
    });
  };

  updateUser: Controller = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, birthDate, biography } = req.body as IUser;

    const user = await this.#usersServices.getById(id);

    if (!user) throw new APIError(404, 'User not found.');

    await this.#usersServices.update({
      id,
      name,
      email,
      password,
      birthDate: birthDate as string,
      biography
    });

    return res.status(200).json({
      message: 'User updated successfully'
    });
  };
}
