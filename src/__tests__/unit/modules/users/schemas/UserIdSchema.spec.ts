import { UserIdSchema } from '@src/modules/users/schemas/UserIdSchema';

describe('UserIdSchema', () => {
  it('should parse a valid user id', () => {
    expect(() => {
      UserIdSchema.parse('123');
    }).not.toThrow();
  });

  it('should throw an error if user id is not a string', () => {
    expect(() => {
      UserIdSchema.parse(123);
    }).toThrow('User id must be a string.');
  });
});
