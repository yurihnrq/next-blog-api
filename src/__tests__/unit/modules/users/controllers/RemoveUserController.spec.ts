import { RemoveUserController } from '@src/modules/users/controllers/RemoveUserController';
import { RemoveUserService } from '@src/modules/users/services/interfaces/RemoveUserService';

import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import { RemoveUserServiceMock } from '@src/__mocks__/modules/users/services/RemoveUserServiceMock';
import APIError from '@src/errors/APIError';
import { AuthInfo } from '@src/modules/common/interfaces/AuthInfo';

const removeUserService: RemoveUserService = new RemoveUserServiceMock();
const removeUserController: APIController = new RemoveUserController(
  removeUserService
);

describe('RemoveUserController', () => {
  it('should call removeUserService only if client user id matches with user id in the request', async () => {
    jest.spyOn(removeUserService, 'execute');
    requestMock.params = {
      id: '1'
    };
    responseMock.locals.authInfo = {
      userId: '1',
      authAt: new Date()
    } as AuthInfo;

    const result = await removeUserController.execute(
      requestMock,
      responseMock
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(removeUserService.execute).toHaveBeenCalled();
  });

  it('should throw an APIError if client user id does not match with user id in the request', async () => {
    jest.spyOn(removeUserService, 'execute');
    requestMock.params = {
      id: '1'
    };
    responseMock.locals.authInfo = {
      userId: '2',
      authAt: new Date()
    } as AuthInfo;

    try {
      await removeUserController.execute(requestMock, responseMock);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(401);
      expect((error as APIError).message).toBe('Unauthorized request.');
    }

    expect.assertions(3);
  });
});
