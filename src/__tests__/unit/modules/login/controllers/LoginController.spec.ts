import { Request, Response } from 'express';
import prisma from '../../../../../configs/prisma';
import { users as usersMock } from '../../../../../mocks/users';
import APIError from '../../../../../models/APIError';
import { LoginControllers } from '../../../../../modules/login/controllers';
import {
  ILoginControllers,
  ILoginServices
} from '../../../../../modules/login/interfaces';
import { LoginJwtServices } from '../../../../../modules/login/services';
import { IUsersServices } from '../../../../../modules/users/interfaces';
import { UsersPrismaServices } from '../../../../../modules/users/services';

const loginServices: ILoginServices = new LoginJwtServices();
const usersServices: IUsersServices = new UsersPrismaServices(prisma);
const loginControllers: ILoginControllers = new LoginControllers(
  loginServices,
  usersServices
);

const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis()
} as unknown;

describe('LoginControllers', () => {
  describe('login', () => {
    it('should throw an APIError if nor user or password is provided', async () => {
      const request = {
        body: {}
      } as unknown;

      try {
        await loginControllers.login(
          request as Request,
          response as Response,
          jest.fn()
        );
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
      }
    });

    it('should throw an APIError if user is not found', async () => {
      jest.spyOn(usersServices, 'getByEmail').mockResolvedValue(null);

      const request = {
        body: {
          email: 'test-email',
          password: 'test-password'
        }
      } as unknown;

      try {
        await loginControllers.login(
          request as Request,
          response as Response,
          jest.fn()
        );
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
      }
    });

    it('should throw an APIError if password is not valid', async () => {
      jest.spyOn(usersServices, 'getByEmail').mockResolvedValue(usersMock[0]);
      jest.spyOn(loginServices, 'validatePassword').mockReturnValue(false);

      const request = {
        body: {
          email: 'test-email',
          password: 'test-password'
        }
      } as unknown;

      try {
        await loginControllers.login(
          request as Request,
          response as Response,
          jest.fn()
        );
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
      }
    });

    it('should generate a token', async () => {
      jest.spyOn(usersServices, 'getByEmail').mockResolvedValue(usersMock[0]);
      jest.spyOn(loginServices, 'validatePassword').mockReturnValue(true);
      jest.spyOn(loginServices, 'generateToken').mockImplementation();

      const request = {
        body: {
          email: 'test-email',
          password: 'test-password'
        }
      } as unknown;

      await loginControllers.login(
        request as Request,
        response as Response,
        jest.fn()
      );

      expect(loginServices.generateToken).toHaveBeenCalledWith(usersMock[0]);
    });
  });
});
