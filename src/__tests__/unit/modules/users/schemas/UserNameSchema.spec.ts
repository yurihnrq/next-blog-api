import { UserNameSchema } from '@src/modules/users/schemas/UserNameSchema';

describe('UserNameSchema', () => {
  it('should parse a valid name', () => {
    expect(() => {
      UserNameSchema.parse('John Doe');
    }).not.toThrow();
  });
});
