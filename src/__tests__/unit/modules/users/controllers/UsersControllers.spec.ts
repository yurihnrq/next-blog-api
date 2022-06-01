import { Request, Response } from 'express';
import prisma from '../../../../../configs/prisma';
import { users as usersMock } from '../../../../../mocks/users';
import APIError from '../../../../../models/APIError';
import { UsersControllers } from '../../../../../modules/users/controllers';
import {
  IUsersControllers,
  IUsersServices
} from '../../../../../modules/users/interfaces';
import { UsersPrismaServices } from '../../../../../modules/users/services';

const usersServices: IUsersServices = new UsersPrismaServices(prisma);
const usersControllers: IUsersControllers = new UsersControllers(usersServices);

const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis()
} as unknown;

describe('UsersControllers', () => {
  describe('getUserById', () => {
    it('should call getById service', async () => {
      jest.spyOn(usersServices, 'getById').mockImplementation(async () => {
        return usersMock[0];
      });

      const request = {
        params: {
          id: 'test-id'
        }
      } as unknown;

      await usersControllers.getUserById(
        request as Request,
        response as Response,
        jest.fn()
      );

      expect(usersServices.getById).toHaveBeenCalled();
    });

    it('should throw an APIError if user is not found', async () => {
      jest.spyOn(usersServices, 'getById').mockImplementation(async () => {
        return null;
      });

      const request = {
        params: {
          id: 'test-id'
        }
      } as unknown;

      try {
        await usersControllers.getUserById(
          request as Request,
          response as Response,
          jest.fn()
        );
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
      }
    });
  });

  describe('getAllUsers', () => {
    it('should call getAll service', async () => {
      jest.spyOn(usersServices, 'getAll').mockImplementation(async () => {
        return usersMock;
      });

      const request = {
        query: {
          page: '1'
        }
      } as unknown;

      await usersControllers.getAllUsers(
        request as Request,
        response as Response,
        jest.fn()
      );

      expect(usersServices.getAll).toHaveBeenCalled();
    });

    it('should call not call parseInt if page is not provided', async () => {
      jest.spyOn(usersServices, 'getAll').mockImplementation(async () => {
        return usersMock;
      });
      jest.spyOn(global, 'parseInt').mockImplementation();

      const request = {
        query: {}
      } as unknown;

      await usersControllers.getAllUsers(
        request as Request,
        response as Response,
        jest.fn()
      );

      expect(global.parseInt).not.toHaveBeenCalled();
    });

    it('should throw an APIError if there are no users', async () => {
      jest.spyOn(usersServices, 'getAll').mockImplementation(async () => {
        return [];
      });

      const request = {
        query: {
          page: '1'
        }
      } as unknown;

      try {
        await usersControllers.getAllUsers(
          request as Request,
          response as Response,
          jest.fn()
        );
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
      }
    });
  });

  describe('createUser', () => {
    it('should throw an APIError if user with provided email already exists', async () => {
      jest.spyOn(usersServices, 'getByEmail').mockImplementation(async () => {
        return usersMock[0];
      });

      const request = {
        body: {}
      } as unknown;

      try {
        await usersControllers.createUser(
          request as Request,
          response as Response,
          jest.fn()
        );
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
      }
    });

    it('should call create service', async () => {
      jest.spyOn(usersServices, 'getByEmail').mockImplementation(async () => {
        return null;
      });
      jest.spyOn(usersServices, 'create').mockImplementation(async () => {
        return usersMock[0];
      });

      const request = {
        body: {
          name: 'test-name',
          email: 'test-email',
          password: 'test-password',
          birthDate: 'test-birthDate',
          biography: 'test-biography'
        }
      } as unknown;

      await usersControllers.createUser(
        request as Request,
        response as Response,
        jest.fn()
      );

      expect(usersServices.getByEmail).toHaveBeenCalled();
      expect(usersServices.create).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should throw an APIError if user is not found', async () => {
      jest.spyOn(usersServices, 'getById').mockImplementation(async () => {
        return null;
      });

      const request = {
        params: {
          id: 'test-id'
        }
      } as unknown;

      try {
        await usersControllers.deleteUser(
          request as Request,
          response as Response,
          jest.fn()
        );
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
      }
    });

    it('should call remove service', async () => {
      jest.spyOn(usersServices, 'getById').mockImplementation(async () => {
        return usersMock[0];
      });
      jest.spyOn(usersServices, 'remove').mockImplementation(async () => {
        return usersMock[0];
      });

      const request = {
        params: {
          id: 'test-id'
        }
      } as unknown;

      await usersControllers.deleteUser(
        request as Request,
        response as Response,
        jest.fn()
      );

      expect(usersServices.remove).toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should throw an APIError if user is not found', async () => {
      jest.spyOn(usersServices, 'getById').mockImplementation(async () => {
        return null;
      });

      const request = {
        params: {
          id: 'test-id'
        },
        body: {}
      } as unknown;

      try {
        await usersControllers.updateUser(
          request as Request,
          response as Response,
          jest.fn()
        );
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
      }
    });

    it('should call update service', async () => {
      jest.spyOn(usersServices, 'getById').mockImplementation(async () => {
        return usersMock[0];
      });
      jest.spyOn(usersServices, 'update').mockImplementation(async () => {
        return usersMock[0];
      });

      const request = {
        params: {
          id: 'test-id'
        },
        body: {
          name: 'test-name',
          email: 'test-email',
          password: 'test-password',
          birthDate: 'test-birthDate',
          biography: 'test-biography'
        }
      } as unknown;

      await usersControllers.updateUser(
        request as Request,
        response as Response,
        jest.fn()
      );

      expect(usersServices.update).toHaveBeenCalled();
    });
  });
});
