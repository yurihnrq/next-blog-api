import { Request, Response } from 'express';
import prisma from '../config/prisma.config';

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();

  if (posts.length > 0) {
    res.status(200).json({
      message: 'Posts fetched successfully',
      data: posts
    });
  } else {
    res.status(404).json({
      message: 'No posts found'
    });
  }
};
