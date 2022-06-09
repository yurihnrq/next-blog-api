import { IGetUserByIdService } from '@src/modules/users/services/interfaces/IGetUserByIdService';
import { GetUserByIdController } from '@src/modules/users/controllers/GetUserByIdController';
import { IController } from '@src/types/IController';

import { requestMock } from '@mocks/express/requestMock';
import { GetUserByIdServiceMock } from '@mocks/modules/users/services/GetUserByIdServiceMock';
import { responseMock } from '@mocks/express/responseMock';
import { usersMock } from '@src/__mocks__/modules/users/usersMocks';

const getUserByIdService: IGetUserByIdService = new GetUserByIdServiceMock();
const getUserByIdController: IController = new GetUserByIdController(
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
      message: 'User fetched successfully.',
      data: usersMock[0]
    });
    expect(getUserByIdService.execute).toHaveBeenCalled();
  });
});
