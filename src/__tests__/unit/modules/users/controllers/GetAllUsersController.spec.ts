import { IGetAllUsersService } from '@src/modules/users/services/interfaces/IGetAllUsersService';
import { GetAllUsersServiceMock } from '@mocks/modules/users/services/GetAllUsersServiceMock';
import { GetAllUsersController } from '@src/modules/users/controllers/GetAllUsersController';
import { IController } from '@src/types/IController';
import { requestMock } from '@src/__mocks__/express/requestMock';
import { responseMock } from '@src/__mocks__/express/responseMock';
import { usersMock } from '@src/__mocks__/modules/users/usersMocks';

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
});
