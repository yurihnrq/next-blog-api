/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           $ref: '#/components/schemas/UserId'
 *         name:
 *           $ref: '#/components/schemas/UserName'
 *         email:
 *           $ref: '#/components/schemas/UserEmail'
 *         password:
 *           $ref: '#/components/schemas/UserPassword'
 *         birthDate:
 *           $ref: '#/components/schemas/UserBirthDate'
 *         biography:
 *           $ref: '#/components/schemas/UserBiography'
 */

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: string | Date;
  biography: string | null;
}
