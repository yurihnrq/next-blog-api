import { AuthMiddleware } from '@src/middlewares/AuthMiddleware';
import { TokenProvider } from '@src/providers/interfaces/TokenProvider';
import { JwtToken } from '@src/providers/JwtToken';
import { Router } from 'express';
import { CreateUserControllerFactory } from '../modules/users/controllers/factories/CreateUserControllerFactory';
import { GetAllUsersControllerFactory } from '../modules/users/controllers/factories/GetAllUsersControllerFactory';
import { GetUserByIdControllerFactory } from '../modules/users/controllers/factories/GetUserByIdControllerFactory';
import { RemoveUserControllerFactory } from '../modules/users/controllers/factories/RemoveUserControllerFactory';
import { UpdateUserControllerFactory } from '../modules/users/controllers/factories/UpdateUserControllerFactory';
import { ValidationMiddleware } from '@src/middlewares/ValidationMiddleware';
import { CreateUserSchema } from '@src/modules/users/interfaces/CreateUserDTO';
import { UpdateUserSchema } from '@src/modules/users/interfaces/UpdateUserDTO';

export const UsersRouter = () => {
  const router = Router();

  const createUserValitator: APIMiddleware = new ValidationMiddleware(
    CreateUserSchema
  );
  const updateUserValidator: APIMiddleware = new ValidationMiddleware(
    UpdateUserSchema
  );
  const tokenProvider: TokenProvider = new JwtToken(
    process.env.JWT_SECRET as string
  );
  const authMiddleware: APIMiddleware = new AuthMiddleware(tokenProvider);

  /**
   * @swagger
   *
   * /users:
   *   post:
   *     description: Create a new user
   *     tags: [Users]
   *     parameters:
   *       - in: body
   *         name: CreateUserDTO
   *         description: The user to create.
   *         schema:
   *           $ref: '#/components/schemas/CreateUserDTO'
   *     responses:
   *       201:
   *         description: User created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type:
   *                 $ref: '#/components/schemas/APIResponse/type'
   *               properties:
   *                 $ref: '#/components/schemas/APIResponse/properties'
   *               example:
   *                 success: true
   *                 data: null
   *                 message: User created successfully.
   *       400:
   *         description: Bad request. Check the error message for more details.
   *         content:
   *           application/json:
   *             schema:
   *               type:
   *                 $ref: '#/components/schemas/APIResponse/type'
   *               properties:
   *                 $ref: '#/components/schemas/APIResponse/properties'
   *               example:
   *                 success: false
   *                 data: null
   *                 message: Invalid input data.
   */
  router.post(
    '/users/',
    createUserValitator.execute,
    CreateUserControllerFactory().execute
  );

  /**
   * @swagger
   *
   * /users:
   *   get:
   *     description: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Users fetched successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type:
   *                 $ref: '#/components/schemas/PaginatedAPIResponse/type'
   *               properties:
   *                 $ref: '#/components/schemas/PaginatedAPIResponse/properties'
   *       204:
   *         description: No users found.
   *         content:
   *           application/json:
   *             schema:
   *               type:
   *                 $ref: '#/components/schemas/APIResponse/type'
   *               properties:
   *                 $ref: '#/components/schemas/APIResponse/properties'
   *               example:
   *                 success: true
   *                 data: null
   *                 message: No users found.
   */
  router.get('/users/', GetAllUsersControllerFactory().execute);

  /**
   * @swagger
   *
   * /users/{userId}:
   *   get:
   *     description: Get data from a specific user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: User Id
   *         description: The user id.
   *         schema:
   *           $ref: '#/components/schemas/UserId'
   *     responses:
   *       200:
   *         description: User fetched successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type:
   *                 $ref: '#/components/schemas/APIResponse/type'
   *               properties:
   *                 success:
   *                   $ref: '#/components/schemas/APIResponse/properties/success'
   *                 message:
   *                   type: string
   *                   example: User fetched successfully.
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       404:
   *         description: Requested user not found.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/APIResponse'
   */
  router.get('/users/:id', GetUserByIdControllerFactory().execute);

  /**
   * @swagger
   *
   * /users/{userId}:
   *   delete:
   *     description: Delete a user.
   *     security:
   *       - bearerAuth: []
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: User Id
   *         description: The user id.
   *         schema:
   *           $ref: '#/components/schemas/UserId'
   *     responses:
   *       200:
   *         description: User deleted successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/APIResponse'
   *               example:
   *                 success: true
   *                 data: null
   *                 message: User created successfully.
   *       404:
   *         description: Requested user not found.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/APIResponse'
   */
  router.delete(
    '/users/:id',
    authMiddleware.execute,
    RemoveUserControllerFactory().execute
  );

  /**
   * @swagger
   *
   * /users/{userId}:
   *   put:
   *     description: Update a user.
   *     security:
   *       - bearerAuth: []
   *     tags: [Users]
   *     parameters:
   *       - in: body
   *         name: UpdateUserDTO
   *         description: The user to create.
   *         schema:
   *           $ref: '#/components/schemas/UpdateUserDTO'
   *       - in: path
   *         name: User Id
   *         description: The user id.
   *         schema:
   *           $ref: '#/components/schemas/UserId'
   *     responses:
   *       200:
   *         description: Users fetched successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/APIResponse'
   *               example:
   *                 success: true
   *                 data: null
   *                 message: User created successfully.
   *       400:
   *         description: Bad request. Check the error message for more details.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/APIResponse'
   *       404:
   *        description: Requested user not found.
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/APIResponse'
   */
  router.put(
    '/users/:id',
    authMiddleware.execute,
    updateUserValidator.execute,
    UpdateUserControllerFactory().execute
  );

  return router;
};
