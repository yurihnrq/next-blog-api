import { PrismaClient } from '@prisma/client';
import { Post } from '../interfaces/Post';
import { CreatePostDTO } from '../interfaces/CreatePostDTO';
import { PostsRepository } from './interface/PostsRepository';
import { UpdatePostDTO } from '../interfaces/UpdatePostDTO';

export class PrismaPostsRepository implements PostsRepository {
  #prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.#prisma = prismaClient;
  }

  getAll(page: number): Promise<Post[]> {
    const posts = this.#prisma.post.findMany({
      take: 5,
      skip: 5 * (page - 1),
      orderBy: {
        createdAt: 'desc'
      }
    });

    return posts;
  }

  async getById(id: string): Promise<Post | null> {
    const post = await this.#prisma.post.findUnique({
      where: {
        id: id
      }
    });

    return post;
  }

  async create(post: CreatePostDTO): Promise<void> {
    await this.#prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        createdAt: new Date()
      }
    });
  }

  async update(post: UpdatePostDTO): Promise<void> {
    await this.#prisma.post.update({
      data: {
        title: post.title,
        content: post.content,
        updatedAt: new Date()
      },
      where: {
        id: post.id
      }
    });
  }

  async remove(id: string): Promise<void> {
    await this.#prisma.post.delete({
      where: {
        id: id
      }
    });
  }
}
