import { RemoveUserController } from '@src/modules/users/controllers/RemoveUserController';
import { IRemoveUserService } from '@src/modules/users/services/interfaces/IRemoveUserService';
import { IController } from '@src/types/IController';

import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import { RemoveUserServiceMock } from '@src/__mocks__/modules/users/services/RemoveUserServiceMock';
import APIError from '@src/errors/APIError';

const removeUserService: IRemoveUserService = new RemoveUserServiceMock();
const removeUserController: IController = new RemoveUserController(
  removeUserService
);

describe('RemoveUserController', () => {
  it('should call removeUserService only if client user id matches with user id in the request', async () => {
    jest.spyOn(removeUserService, 'execute');
    requestMock.params = {
      id: '1'
    };
    responseMock.locals = {
      userId: '1'
    };

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
    responseMock.locals = {
      userId: '2'
    };

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
