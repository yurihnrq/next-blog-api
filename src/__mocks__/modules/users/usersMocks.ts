import { IUser } from '@src/modules/users/services/interfaces/IUser';

export const usersMock: IUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: '111111111',
    biography: 'John Doe Bio',
    birthDate: new Date()
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'janedoe@mail.com',
    password: '222222222',
    biography: 'Jane Doe Bio',
    birthDate: new Date()
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'johnsmith@mail.com',
    password: '333333333',
    biography: 'John Smith Bio',
    birthDate: new Date()
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'janesmith@mail.com',
    password: '444444444',
    biography: 'Jane Smith Bio',
    birthDate: new Date()
  },
  {
    id: '5',
    name: 'Steven Doe',
    email: 'stevendoe@mail.com',
    password: '555555555',
    biography: 'Steven Doe Bio',
    birthDate: new Date()
  },
  {
    id: '6',
    name: 'Sandra Doe',
    email: 'sandradoe@mail.com',
    password: '666666666',
    biography: 'Sandra Doe Bio',
    birthDate: new Date()
  }
];
