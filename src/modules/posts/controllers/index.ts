import prisma from '../../../configs/prisma.config';

export const getAllPosts: Controller = async (_req, res) => {
  const posts = await prisma.post.findMany();

  if (posts.length > 0) {
    return res.status(200).json({
      message: 'Posts fetched successfully',
      data: posts
    });
  } else {
    return res.status(404).json({
      message: 'No posts found'
    });
  }
};
