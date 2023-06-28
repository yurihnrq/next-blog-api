import { Post } from '@src/modules/common/interfaces/Post';
import { CreateUserDTO } from '../../interfaces/CreateUserDTO';
import { UpdateUserDTO } from '../../interfaces/UpdateUserDTO';
import { User } from '../../interfaces/User';

/**
 * Interface that represents a repository for managing users and their posts.
 */
export interface UsersRepository {
  /**
   * Gets a user by its id.
   *
   * @param {string} id The id of the user.
   * @returns {Promise<User | null>} A promise that resolves to the user or null if it was not found.
   */
  getById(id: string): Promise<User | null>;
  /**
   * Gets a user by its email.
   *
   * @param {string} email The email of the user.
   * @returns {Promise<User | null>} A promise that resolves to the user or null if it was not found.
   */
  getByEmail(email: string): Promise<User | null>;
  /**
   * Gets all users.
   *
   * @param {number} page The page of the users to be retrieved.
   * @returns {Promise<User[]>} A promise that resolves to the users array.
   */
  getAll(page: number): Promise<User[]>;
  /**
   * Creates a new user.
   *
   * @param {CreateUserDTO} user The data to be used to create the user.
   * @returns {Promise<User>} A promise that resolves to the created user.
   */
  create(user: CreateUserDTO): Promise<User>;
  /**
   * Updates the data of an existing user.
   *
   * @param {UpdateUserDTO} user The data to be used to update the user.
   * @returns {Promise<User>} A promise that resolves to the updated user.
   */
  update(user: UpdateUserDTO): Promise<User>;
  /**
   * Removes a user by its id.
   *
   * @param {string} id The id of the user to be removed.
   * @returns {Promise<void>} A promise that resolves when the user is removed.
   */
  remove(id: string): Promise<void>;
  /**
   * Gets all posts from a user.
   *
   * @param {string} authorId The id of the user.
   * @param {number} page The page of the posts to be retrieved.
   */
  getPosts(authorId: string, page: number): Promise<Post[]>;
}
