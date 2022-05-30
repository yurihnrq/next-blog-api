import usersServices from '../services/';
import APIError from '../../../models/APIError';
interface IUser {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  biography?: string;
}

export const getUserById: Controller = async (req, res) => {
  const { id } = req.params;

  const user = await usersServices.getById(id);

  if (!user) throw new APIError(404, 'User not found.');

  return res.status(200).json({
    message: 'User fetched successfully.',
    data: user
  });
};

export const getAllUsers: Controller = async (req, res) => {
  const { page } = req.query;

  const pageInt = page ? parseInt(page as string) : 1;

  const users = await usersServices.getAll(pageInt);

  if (users.length <= 0)
    throw new APIError(404, 'There are no users registered.');

  return res.status(200).json({
    message: 'Users fetched successfully.',
    data: users
  });
};

export const createUser: Controller = async (req, res) => {
  const { name, email, password, birthDate, biography } = req.body as IUser;

  const user = await usersServices.getByEmail(email);

  if (user) throw new APIError(409, 'User with provided email already exists.');

  const createdUser = await usersServices.create(
    name,
    email,
    password,
    birthDate,
    biography
  );

  if (!createdUser) throw new APIError(500, 'User could not be created.');

  return res.status(201).json({
    message: 'User created successfully.'
  });
};

export const deleteUser: Controller = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await usersServices.remove(id);

  if (!deletedUser) throw new APIError(404, 'User not found.');

  return res.status(200).json({
    message: 'User deleted successfully'
  });
};

export const updateUser: Controller = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, birthDate, biography } = req.body as IUser;

  const updatedUser = await usersServices.update(
    id,
    name,
    email,
    password,
    birthDate,
    biography
  );

  if (!updatedUser) throw new APIError(404, 'User not found.');

  return res.status(200).json({
    message: 'User updated successfully'
  });
};
