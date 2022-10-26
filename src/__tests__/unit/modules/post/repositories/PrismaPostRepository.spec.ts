import prisma from '@src/configs/prisma';
import { PrismaPostsRepository } from '@src/modules/posts/repositories/PrismaPostsRepository';
import { postsMock } from '@src/__mocks__/modules/posts/postsMock';

const postsRepository = new PrismaPostsRepository(prisma);

describe('PrismaPostRepository', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime();
  });

  it('should get all posts', async () => {
    prisma.post.findMany = jest.fn().mockResolvedValue(postsMock);

    const posts = await postsRepository.getAll(1);

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

    const post = await postsRepository.getById('1');

    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: {
        id: '1'
      }
    });
    expect(post).toEqual(postsMock[0]);
  });

  it('should create a post', async () => {
    prisma.post.create = jest.fn().mockImplementation();

    await postsRepository.create({
      title: postsMock[1].title,
      content: postsMock[1].content,
      authorId: postsMock[1].authorId
    });

    expect(prisma.post.create).toHaveBeenCalledWith({
      data: {
        title: postsMock[1].title,
        content: postsMock[1].content,
        authorId: postsMock[1].authorId,
        createdAt: new Date()
      }
    });
  });

  it('should update a post', async () => {
    prisma.post.update = jest.fn().mockImplementation();

    await postsRepository.update({
      id: postsMock[1].id as string,
      title: postsMock[1].title,
      content: postsMock[1].content,
      updateAuthorId: postsMock[1].authorId
    });

    expect(prisma.post.update).toHaveBeenCalledWith({
      data: {
        title: postsMock[1].title,
        content: postsMock[1].content,
        updatedAt: new Date()
      },
      where: {
        id: postsMock[1].id
      }
    });
  });

  it('should delete a post', async () => {
    prisma.post.delete = jest.fn().mockImplementation();

    await postsRepository.remove('1');

    expect(prisma.post.delete).toHaveBeenCalledWith({
      where: {
        id: '1'
      }
    });
  });
});
