import { IPost } from '@src/modules/post/interfaces/IPost';

export const postsMock: IPost[] = [
  {
    id: '1',
    title: 'Post 1',
    content: 'Content 1',
    authorId: '1',
    createdAt: new Date('2022-06-06'),
    updatedAt: null
  },
  {
    id: '2',
    title: 'Post 2',
    content: 'Content 2',
    authorId: '1',
    createdAt: new Date('2022-09-05'),
    updatedAt: null
  },
  {
    id: '3',
    title: 'Post 3',
    content: 'Content 3',
    authorId: '1',
    createdAt: new Date('2022-04-02'),
    updatedAt: null
  },
  {
    id: '4',
    title: 'Post 4',
    content: 'Content 4',
    authorId: '1',
    createdAt: new Date('2022-05-01'),
    updatedAt: null
  },
  {
    id: '5',
    title: 'Post 5',
    content: 'Content 5',
    authorId: '1',
    createdAt: new Date('2022-06-01'),
    updatedAt: null
  }
];
