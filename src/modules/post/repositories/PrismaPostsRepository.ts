import { PrismaClient } from '@prisma/client';
import { IPost } from '../interfaces/IPost';
import { IPostsRepository } from './interface/IPostsRepository';

export class PrismaPostsRepository implements IPostsRepository {
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

  async create(post: IPost): Promise<void> {
    await this.#prisma.post.create({
      data: {
        id: post.id as string,
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        createdAt: new Date(post.createdAt)
      }
    });
  }

  async update(post: IPost): Promise<void> {
    await this.#prisma.post.update({
      data: {
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        updatedAt: new Date()
      },
      where: {
        id: post.id
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.#prisma.post.delete({
      where: {
        id: id
      }
    });
  }
}