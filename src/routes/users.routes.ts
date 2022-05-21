import { Router } from 'express';
import {
  getUserById,
  getAllUsers,
  createUser,
  deleteUser
} from '../controllers/users.controllers';
import { validateUserInfo } from '../middleware/validate/userInfo.middleware';

const router = Router();

router.get('/users/:id', getUserById);
router.get('/users/', getAllUsers);
router.post('/users/', validateUserInfo, createUser);
router.delete('/users/:id', deleteUser);

export default router;
