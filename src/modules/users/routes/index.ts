import { Router } from 'express';
import {
  getUserById,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser
} from '../controllers';
import authJWT from '../../../middlewares/authentication/jwt';
import validateUserInfo from '../../../middlewares/validation/userInfo';

const usersRouter = Router();

usersRouter.get('/users/:id', getUserById);
usersRouter.get('/users/', getAllUsers);
usersRouter.post('/users/', validateUserInfo, createUser);
usersRouter.delete('/users/:id', authJWT, deleteUser);
usersRouter.put('/users/:id', authJWT, validateUserInfo, updateUser);

export default usersRouter;
