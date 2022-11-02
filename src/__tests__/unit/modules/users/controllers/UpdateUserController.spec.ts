import { UpdateUserController } from '@src/modules/users/controllers/UpdateUserController';
import { UpdateUserService } from '@src/modules/users/services/interfaces/UpdateUserService';

import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import { UpdateUserServiceMock } from '@mocks/modules/users/services/UpdateUserServiceMock';
import APIError from '@src/errors/APIError';
import { AuthInfo } from '@src/modules/auth/services/interfaces/AuthInfo';

const updateUserService: UpdateUserService = new UpdateUserServiceMock();
const updateUserController = new UpdateUserController(updateUserService);

describe('UpdateUserController', () => {
  it('should call updateUserService only if client user id matches with user id in the request', async () => {
    jest.spyOn(updateUserService, 'execute');
    requestMock.params = {
      id: '1'
    };
    responseMock.locals.authInfo = {
      userId: '1',
      authAt: new Date()
    } as AuthInfo;

    const result = await updateUserController.execute(
      requestMock,
      responseMock
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(updateUserService.execute).toHaveBeenCalled();
  });

  it('should throw an APIError if client user id does not match with user id in the request', async () => {
    requestMock.params = {
      id: '1'
    };
    responseMock.locals.authInfo = {
      userId: '2',
      authAt: new Date()
    } as AuthInfo;

    try {
      await updateUserController.execute(requestMock, responseMock);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(401);
      expect((error as APIError).message).toBe('Unauthorized request.');
    }

    expect.assertions(3);
  });
});
