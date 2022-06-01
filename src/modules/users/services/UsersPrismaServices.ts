import bcrypt from 'bcrypt';
import { IUser, IUsersServices } from '../interfaces';
import { PrismaClient } from '@prisma/client';

export class UsersPrismaServices implements IUsersServices {
  #prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.#prisma = prisma;
  }

  getById = async (id: string) => {
    const user = await this.#prisma.user.findUnique({
      where: {
        id
      }
    });

    return user as IUser;
  };

  getByEmail = async (email: string) => {
    const user = await this.#prisma.user.findUnique({
      where: {
        email
      }
    });

    return user as IUser;
  };

  getAll = async (page: number) => {
    const users = await this.#prisma.user.findMany({
      take: 10,
      skip: 10 * (page - 1)
    });

    return users as IUser[];
  };

  create = async (user: IUser) => {
    const createdUser = await this.#prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        birthDate: new Date(user.birthDate),
        biography: user.biography
      }
    });

    return createdUser as IUser;
  };

  update = async (user: IUser) => {
    const updatedUser = await this.#prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        birthDate: new Date(user.birthDate),
        biography: user.biography
      }
    });

    return updatedUser as IUser;
  };

  remove = async (id: string) => {
    const deletedUser = await this.#prisma.user.delete({
      where: {
        id
      }
    });

    return deletedUser as IUser;
  };
}
