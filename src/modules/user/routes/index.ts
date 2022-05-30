import { Router } from 'express';
import {
  getUserById,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser
} from '../controllers';
import { authJWT } from '../../../middleware/authentication/auth.middleware';
import { validateUserInfo } from '../../../middleware/validation/userInfo.middleware';

const router = Router();

router.get('/users/:id', getUserById);
router.get('/users/', getAllUsers);
router.post('/users/', validateUserInfo, createUser);
router.delete('/users/:id', authJWT, deleteUser);
router.put('/users/:id', authJWT, validateUserInfo, updateUser);

export default router;
