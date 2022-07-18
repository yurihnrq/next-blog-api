import { Post, PrismaClient } from '@prisma/client';
import { IPostRepository } from './interface/IPostRepository';

export class PrismaPostRepository implements IPostRepository {
  #prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.#prisma = prismaClient;
  }

  getAll(_page: number): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }

  async getById(id: string): Promise<Post | null> {
    this.#prisma.post.findUnique({
      where: {
        id: id
      }
    });

    return null;
  }

  create(_post: Post): void {
    throw new Error('Method not implemented.');
  }

  update(_post: Post): void {
    throw new Error('Method not implemented.');
  }

  delete(_id: string): void {
    throw new Error('Method not implemented.');
  }
}
