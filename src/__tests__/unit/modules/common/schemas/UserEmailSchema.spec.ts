import { UserEmailSchema } from '@src/modules/common/schemas/UserEmailSchema';

describe('UserEmailSchema', () => {
  it('should parse a valid email', () => {
    expect(() => {
      UserEmailSchema.parse('test@mail.com');
    }).not.toThrow();
  });

  it('shuold throw if email is not provided', () => {
    expect(() => {
      UserEmailSchema.parse(undefined);
    }).toThrow('Email is required.');
  });

  it('should throw if email is not a string', () => {
    expect(() => {
      UserEmailSchema.parse(123);
    }).toThrow('Email must be a string.');
  });

  it('shuold throw if email is not a valid', () => {
    expect(() => {
      UserEmailSchema.parse('test');
    }).toThrow('Invalid email.');
  });
});
