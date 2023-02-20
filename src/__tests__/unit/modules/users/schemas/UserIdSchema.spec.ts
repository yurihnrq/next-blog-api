import { UserIdSchema } from '@src/modules/users/schemas/UserIdSchema';

describe('UserIdSchema', () => {
  it('should parse a valid user id', () => {
    expect(() => {
      UserIdSchema.parse('123');
    }).not.toThrow();
  });
});
