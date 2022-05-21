import app from '../../config/app.config';
import request from 'supertest';
import prisma from '../../config/prisma.config';

describe('GET /posts', () => {
  it('should return all posts with status 200', async () => {
    prisma.post.findMany = jest.fn().mockResolvedValue([
      {
        id: '1',
        title: 'Post 1',
        content: 'Content 1',
        published: true
      },
      {
        id: '2',
        title: 'Post 2',
        content: 'Content 2',
        published: false
      }
    ]);

    const {
      body: { data },
      status
    } = await request(app).get('/posts');

    expect(status).toBe(200);
    expect(data).toHaveLength(2);
  });

  it('should return status 404 when no posts are found', async () => {
    prisma.post.findMany = jest.fn().mockResolvedValue([]);
    const {
      body: { message },
      status
    } = await request(app).get('/posts');

    expect(status).toBe(404);
    expect(message).toBe('No posts found');
  });
});
