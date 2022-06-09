import { CreateUserController } from '@src/modules/users/controllers/CreateUserController';
import { IController } from '@src/modules/users/controllers/interfaces/IController';
import { ICreateUserService } from '@src/modules/users/services/interfaces/ICreateUserService';
import { usersMock } from '@mocks/modules/users/usersMocks';
import { requestMock } from '@mocks/express/requestMock';
import { responseMock } from '@mocks/express/responseMock';
import { CreateUserServiceMock } from '@mocks/modules/users/services/CreateUserServiceMock';

const createUserService: ICreateUserService = new CreateUserServiceMock();
const createUserController: IController = new CreateUserController(
  createUserService
);

describe('CreateUserController', () => {
  it('should call the createUserService and return a response', async () => {
    requestMock.body = usersMock[0];
    jest.spyOn(createUserService, 'execute');

    await createUserController.execute(requestMock, responseMock);

    expect(createUserService.execute).toHaveBeenCalledWith({
      ...usersMock[0],
      id: undefined
    });
    expect(responseMock.status).toHaveBeenCalledWith(201);
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'User created successfully.'
    });
  });
});
