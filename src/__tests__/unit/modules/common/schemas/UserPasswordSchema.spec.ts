import { UserPasswordSchema } from '@src/modules/common/schemas/UserPasswordSchema';

describe('UserPasswordSchema', () => {
  it('should parse a valid password', () => {
    expect(() => {
      UserPasswordSchema.parse('12345678');
    }).not.toThrow();
  });

  it('should throw an error if password is not provided', () => {
    expect(() => {
      UserPasswordSchema.parse(undefined);
    }).toThrow('Password is required.');
  });
});
