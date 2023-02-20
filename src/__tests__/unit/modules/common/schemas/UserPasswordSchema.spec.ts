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

  it('should throw an error if password is not a string', () => {
    expect(() => {
      UserPasswordSchema.parse(12345678);
    }).toThrow('Password must be a string.');
  });

  it('should throw an error if password is too short', () => {
    expect(() => {
      UserPasswordSchema.parse('1234567');
    }).toThrow('Password must have at least 8 characters.');
  });
});
