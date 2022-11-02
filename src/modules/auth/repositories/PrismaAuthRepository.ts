import { PrismaClient } from '@prisma/client';
import { IUser } from '@src/modules/users/interfaces/User';
import { AuthRepository } from './interfaces/AuthRepository';

export class PrismaAuthRepository implements AuthRepository {
  #prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.#prismaClient = prismaClient;
  }

  async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.#prismaClient.user.findUnique({
      where: {
        email
      }
    });

    return user as IUser;
  }
}
