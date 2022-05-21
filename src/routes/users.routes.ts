import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers/users.controllers';
import { validateUserInfo } from '../middleware/validate/userInfo.middleware';

const router = Router();

router.get('/users/', getAllUsers);
router.post('/users/', validateUserInfo, createUser);

export default router;
