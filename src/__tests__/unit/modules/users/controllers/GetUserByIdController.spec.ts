import { IGetUserByIdService } from '@src/modules/users/services/interfaces/IGetUserByIdService';
import { GetUserByIdController } from '@src/modules/users/controllers/GetUserByIdController';

import { requestMock } from '@mocks/express/requestMock';
import { GetUserByIdServiceMock } from '@mocks/modules/users/services/GetUserByIdServiceMock';
import { responseMock } from '@mocks/express/responseMock';
import { usersMock } from '@src/__mocks__/modules/users/usersMocks';
import APIError from '@src/errors/APIError';

const getUserByIdService: IGetUserByIdService = new GetUserByIdServiceMock();
const getUserByIdController: APIController = new GetUserByIdController(
  getUserByIdService
);

describe('GetUserByIdController', () => {
  beforeEach(() => {
    jest.spyOn(getUserByIdService, 'execute');
  });

  it('should call getUserByIdService and return a user', async () => {
    requestMock.params = {
      id: '1'
    };

    const result = await getUserByIdController.execute(
      requestMock,
      responseMock
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith({
      success: true,
      message: 'User fetched successfully.',
      data: usersMock[0]
    });
    expect(getUserByIdService.execute).toHaveBeenCalled();
  });

  it('should throw an APIError if user id is not provided', async () => {
    requestMock.params = {
      id: undefined as unknown as string
    };

    try {
      await getUserByIdController.execute(requestMock, responseMock);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(400);
      expect((error as APIError).message).toBe('User id is required.');
    }

    expect.assertions(3);
  });
});
