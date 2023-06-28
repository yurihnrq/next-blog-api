import { CreateUserController } from '../CreateUserController';
import { UsersRepository } from '../../repositories/interfaces/UsersRepository';
import { CreateUser } from '../../services/CreateUser';
import { CreateUserService } from '../../services/interfaces/CreateUserService';
import { PrismaUsersRepositoryFactory } from '../../repositories/factories/PrismaUsersRepositoryFactory';

/**
 * Factory to create an instance of the CreateUserController class.
 *
 * @returns {CreateUserController} An instance of the CreateUserController class.
 */
export const CreateUserControllerFactory = (): CreateUserController => {
  const usersRepository: UsersRepository = PrismaUsersRepositoryFactory();

  const createUserService: CreateUserService = new CreateUser(usersRepository);

  return new CreateUserController(createUserService);
};
