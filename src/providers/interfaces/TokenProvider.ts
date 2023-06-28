/**
 * Interface for the token provider.
 * Used to generate and verify tokens.
 * Should be used to create a facade for token libraries.
 *
 * @see {@link https://refactoring.guru/design-patterns/facade}
 */
export interface TokenProvider {
  /**
   * Generates a token with a payload embedded in it.
   *
   * @param {T} payload The payload to be embedded in the token.
   * @returns {Promise<string>} The generated token.
   *
   * @example
   * const tokenProvider: TokenProvider = new MyTokenProvider();
   *
   * const token = await tokenProvider.generateToken<string>('my-payload');
   */
  generateToken<T extends object>(payload: T): Promise<string>;
  /**
   * Verifies if a token is valid and returns the payload embedded in it.
   *
   * Should throw an error if the token is invalid.
   *
   * @param {string} token The token to be verified.
   * @returns {Promise<T>} The payload embedded in the token.
   *
   * @example
   * const tokenProvider: TokenProvider = new MyTokenProvider();
   *
   * const token = 'my-token';
   *
   * const payload = await tokenProvider.verifyToken<string>(token);
   */
  verifyToken<T extends object>(token: string): Promise<T>;
}
