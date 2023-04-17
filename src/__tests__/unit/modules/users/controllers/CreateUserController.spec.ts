import { CreateUserController } from '@src/modules/users/controllers/CreateUserController';
import { CreateUserService } from '@src/modules/users/services/interfaces/CreateUserService';
import { usersMock } from '@mocks/modules/users/usersMocks';
import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import { CreateUserServiceMock } from '@mocks/modules/users/services/CreateUserServiceMock';

const createUserService: CreateUserService = new CreateUserServiceMock();
const createUserController: APIController = new CreateUserController(
  createUserService
);

describe('CreateUserController', () => {
  it('should call the createUserService and return a response', async () => {
    requestMock.body = usersMock[0];
    jest.spyOn(createUserService, 'execute');
    jest.spyOn(responseMock, 'status');
    jest.spyOn(responseMock, 'json');

    await createUserController.execute(requestMock, responseMock);

    expect(createUserService.execute).toHaveBeenCalledWith({
      ...usersMock[0],
      id: undefined
    });
    expect(responseMock.status).toHaveBeenCalledWith(201);
    expect(responseMock.json).toHaveBeenCalledWith({
      success: true,
      message: 'User created successfully.',
      data: null
    });
  });
});
