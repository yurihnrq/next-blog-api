/**
 * Interface for the hash provider.
 * Used to generate and compare hashes.
 * Should be used to create a facade for hash libraries.
 *
 * @see {@link https://refactoring.guru/design-patterns/facade}
 */
export interface HashProvider {
  /**
   * Generates a hash from a payload.
   *
   * @param {string} payload The payload to be hashed.
   *
   * @returns {Promise<string>} The generated hash.
   *
   * @example
   * const hashProvider: HashProvider = new MyHashProvider();
   *
   * const hash = await hashProvider.generateHash('my-password');
   */
  generateHash(payload: string): Promise<string>;
  /**
   * Compares a payload with a hash.
   *
   * @param {string} payload The payload to be compared.
   *
   * @param {string} hashed The hash to be compared.
   *
   * @returns {Promise<boolean>} A promise that resolves to true if the payload
   * matches the hash.
   *
   * @example
   * const hashProvider: HashProvider = new MyHashProvider();
   *
   * const hash = await hashProvider.generateHash('my-password');
   *
   * const isMatch = await hashProvider.compareHash('my-password', hash);
   * // isMatch === true
   */
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
