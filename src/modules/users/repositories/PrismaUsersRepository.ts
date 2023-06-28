import { PrismaClient } from '@prisma/client';
import { HashProvider } from '../../../providers/interfaces/HashProvider';
import { CreateUserDTO } from '../interfaces/CreateUserDTO';
import { UpdateUserDTO } from '../interfaces/UpdateUserDTO';
import { User } from '../interfaces/User';
import { UsersRepository } from './interfaces/UsersRepository';

/**
 * Implementation of the UsersRepository interface using Prisma.
 */
export class PrismaUsersRepository implements UsersRepository {
  #prismaClient: PrismaClient;
  #hashProvider: HashProvider;

  constructor(prismaClient: PrismaClient, hashProvider: HashProvider) {
    this.#prismaClient = prismaClient;
    this.#hashProvider = hashProvider;
  }

  getById = async (id: string) => {
    const user = await this.#prismaClient.user.findUnique({
      where: {
        id
      }
    });

    return user as User;
  };

  getByEmail = async (email: string) => {
    const user = await this.#prismaClient.user.findUnique({
      where: {
        email
      }
    });

    return user as User | null;
  };

  getAll = async (page: number) => {
    const users = await this.#prismaClient.user.findMany({
      take: 10,
      skip: 10 * (page - 1)
    });

    return users as User[];
  };

  create = async (user: CreateUserDTO) => {
    const createdUser = await this.#prismaClient.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: await this.#hashProvider.generateHash(user.password),
        birthDate: new Date(user.birthDate),
        biography: user.biography
      }
    });

    return createdUser as User;
  };

  update = async (user: UpdateUserDTO) => {
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

    return updatedUser as User;
  };

  remove = async (id: string) => {
    await this.#prismaClient.user.delete({
      where: {
        id
      }
    });
  };

  getPosts = async (authorId: string, page: number) => {
    return await this.#prismaClient.post.findMany({
      where: {
        authorId
      },
      take: 10,
      skip: 10 * (page - 1),
      orderBy: {
        createdAt: 'desc'
      }
    });
  };
}
