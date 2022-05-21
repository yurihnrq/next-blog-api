import { Router } from 'express';
import {
  getUserById,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser
} from '../controllers/users.controllers';
import { validateUserInfo } from '../middleware/validation/userInfo.middleware';

const router = Router();

router.get('/users/:id', getUserById);
router.get('/users/', getAllUsers);
router.post('/users/', validateUserInfo, createUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', validateUserInfo, updateUser);

export default router;
