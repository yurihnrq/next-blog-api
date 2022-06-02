import prisma from '../../../configs/prisma';
import bcrypt from 'bcrypt';

const getById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });

  return user;
};

const getByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return user;
};

const getAll = async (page: number) => {
  const users = await prisma.user.findMany({
    take: 10,
    skip: 10 * (page - 1)
  });

  return users;
};

const create = async (
  name: string,
  email: string,
  password: string,
  birthDate: string,
  biography: string | null = null
) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      birthDate: new Date(birthDate),
      biography
    }
  });

  return user;
};

const update = async (
  id: string,
  name: string,
  email: string,
  password: string,
  birthDate: string,
  biography: string | null = null
) => {
  const updatedUser = await prisma.user.update({
    where: {
      id
    },
    data: {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      birthDate: new Date(birthDate),
      biography
    }
  });

  return updatedUser;
};

const remove = async (id: string) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id
    }
  });

  return deletedUser;
};

const usersServices = {
  getById,
  getByEmail,
  getAll,
  create,
  update,
  remove
};

export default usersServices;
