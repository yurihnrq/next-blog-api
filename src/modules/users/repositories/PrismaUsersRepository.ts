import { PrismaClient } from '@prisma/client';
import { IHashProvider } from '../../../providers/interfaces/IHashProvider';
import { IUser } from '../services/interfaces/IUser';
import { IUsersRepository } from './interfaces/IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
  #prismaClient: PrismaClient;
  #hashProvider: IHashProvider;

  constructor(prismaClient: PrismaClient, hashProvider: IHashProvider) {
    this.#prismaClient = prismaClient;
    this.#hashProvider = hashProvider;
  }

  getById = async (id: string) => {
    const user = await this.#prismaClient.user.findUnique({
      where: {
        id
      }
    });

    return user as IUser;
  };

  getByEmail = async (email: string) => {
    const user = await this.#prismaClient.user.findUnique({
      where: {
        email
      }
    });

    return user as IUser;
  };

  getAll = async (page: number) => {
    const users = await this.#prismaClient.user.findMany({
      take: 10,
      skip: 10 * (page - 1)
    });

    return users as IUser[];
  };

  create = async (user: IUser) => {
    const createdUser = await this.#prismaClient.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: await this.#hashProvider.generateHash(user.password),
        birthDate: new Date(user.birthDate),
        biography: user.biography
      }
    });

    return createdUser as IUser;
  };

  update = async (user: IUser) => {
    const updatedUser = await this.#prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        name: user.name,
        email: user.email,
        password: await this.#hashProvider.generateHash(user.password),
        birthDate: new Date(user.birthDate),
        biography: user.biography
      }
    });

    return updatedUser as IUser;
  };

  remove = async (id: string) => {
    await this.#prismaClient.user.delete({
      where: {
        id
      }
    });
  };
}
