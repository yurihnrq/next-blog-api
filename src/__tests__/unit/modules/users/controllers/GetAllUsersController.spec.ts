import { IGetAllUsersService } from '@src/modules/users/services/interfaces/IGetAllUsersService';
import { GetAllUsersController } from '@src/modules/users/controllers/GetAllUsersController';
import { IController } from '@src/types/IController';

import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import { usersMock } from '@mocks/modules/users/usersMocks';
import { GetAllUsersServiceMock } from '@mocks/modules/users/services/GetAllUsersServiceMock';

const getAllUsersService: IGetAllUsersService = new GetAllUsersServiceMock();
const getAllUsersController: IController = new GetAllUsersController(
  getAllUsersService
);

describe('GetAllUsersController', () => {
  it('should call getAllUsersService and return all users', async () => {
    requestMock.query = {
      page: undefined
    };

    const result = await getAllUsersController.execute(
      requestMock,
      responseMock
    );

    expect(result.status).toHaveBeenCalledWith(200);
    expect(result.json).toHaveBeenCalledWith({
      message: 'Users fetched successfully.',
      data: usersMock
    });
  });

  it('should parse page query param if it is provided', async () => {
    jest.spyOn(global, 'parseInt');
    const page = '2';
    requestMock.query = {
      page
    };

    await getAllUsersController.execute(requestMock, responseMock);

    expect(global.parseInt).toHaveBeenCalledWith(page);
  });
});
