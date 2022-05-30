interface IPost {
  id: number;
  title: string;
  content: string;
  author: number;
  createdAt: Date;
  updatedAt: Date;
}

export const posts: IPost[] = [
  {
    id: 1,
    title: 'Post One',
    content: 'This is the first post',
    author: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: 'Post Two',
    content: 'This is the second post',
    author: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: 'Post Three',
    content: 'This is the third post',
    author: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    title: 'Post Four',
    content: 'This is the fourth post',
    author: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    title: 'Post Five',
    content: 'This is the fifth post',
    author: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    title: 'Post Six',
    content: 'This is the sixth post',
    author: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    title: 'Post Seven',
    content: 'This is the seventh post',
    author: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    title: 'Post Eight',
    content: 'This is the eighth post',
    author: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
