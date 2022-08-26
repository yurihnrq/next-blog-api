import { Post, PrismaClient } from '@prisma/client';
import { IPost } from '../interfaces/IPost';
import { IPostRepository } from './interface/IPostRepository';

export class PrismaPostRepository implements IPostRepository {
  #prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.#prisma = prismaClient;
  }

  getAll(page: number): Promise<IPost[]> {
    const posts = this.#prisma.post.findMany({
      take: 5,
      skip: 5 * (page - 1),
      orderBy: {
        createdAt: 'desc'
      }
    });

    return posts;
  }

  async getById(id: string): Promise<IPost | null> {
    const post = await this.#prisma.post.findUnique({
      where: {
        id: id
      }
    });

    return post;
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
