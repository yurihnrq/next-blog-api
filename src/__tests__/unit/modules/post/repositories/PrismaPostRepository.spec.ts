import prisma from '@src/configs/prisma';
import { PrismaPostRepository } from '@src/modules/post/repositories/PrismaPostRepository';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';

const postRepository = new PrismaPostRepository(prisma);

describe('PrismaPostRepository', () => {
  it('should get all posts', async () => {
    prisma.post.findMany = jest.fn().mockResolvedValue(postsMock);

    const posts = await postRepository.getAll(1);

    expect(prisma.post.findMany).toHaveBeenCalledWith({
      take: 5,
      skip: 5 * (1 - 1),
      orderBy: {
        createdAt: 'desc'
      }
    });
    expect(posts).toEqual(postsMock);
  });

  it('should get a post by id', async () => {
    prisma.post.findUnique = jest.fn().mockResolvedValue(postsMock[0]);

    const post = await postRepository.getById('1');

    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: {
        id: '1'
      }
    });
    expect(post).toEqual(postsMock[0]);
  });
});
