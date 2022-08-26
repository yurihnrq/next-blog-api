import prisma from '@src/configs/prisma';
import { PrismaPostRepository } from '@src/modules/post/repositories/PrismaPostRepository';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';

const postRepository = new PrismaPostRepository(prisma);

describe('PrismaPostRepository', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime();
  });

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

  it('should create a post', async () => {
    prisma.post.create = jest.fn().mockImplementation();

    await postRepository.create(postsMock[1]);

    expect(prisma.post.create).toHaveBeenCalledWith({
      data: {
        id: postsMock[1].id,
        title: postsMock[1].title,
        content: postsMock[1].content,
        authorId: postsMock[1].authorId,
        createdAt: new Date(postsMock[1].createdAt)
      }
    });
  });

  it('should update a post', async () => {
    prisma.post.update = jest.fn().mockImplementation();

    await postRepository.update(postsMock[0]);

    expect(prisma.post.update).toHaveBeenCalledWith({
      data: {
        title: postsMock[0].title,
        content: postsMock[0].content,
        authorId: postsMock[0].authorId,
        updatedAt: new Date()
      },
      where: {
        id: postsMock[0].id
      }
    });
  });
});
