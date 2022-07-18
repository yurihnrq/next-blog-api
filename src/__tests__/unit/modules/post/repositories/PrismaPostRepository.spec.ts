import prisma from '@src/configs/prisma';
import { PrismaPostRepository } from '@src/modules/post/repositories/PrismaPostRepository';

const postRepository = new PrismaPostRepository(prisma);

describe('PrismaPostRepository', () => {
  it('should get a post by id', async () => {
    prisma.post.findUnique = jest.fn().mockResolvedValue(null);

    await postRepository.getById('1');

    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: {
        id: '1'
      }
    });
  });
});
