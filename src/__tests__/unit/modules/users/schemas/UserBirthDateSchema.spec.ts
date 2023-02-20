import { UserBirthDateSchema } from '@src/modules/users/schemas/UserBirthDateSchema';

describe('UserBirthDateSchema', () => {
  it('shuold parse a valid birth date', () => {
    expect(() => {
      UserBirthDateSchema.parse(new Date());
    }).not.toThrow();
  });

  it('should parse a valid birth date string', () => {
    expect(() => {
      UserBirthDateSchema.parse('2021-01-01');
    }).not.toThrow();
  });

  it('should throw an error if birth date is not date nor string', () => {
    expect(() => {
      UserBirthDateSchema.parse(12345678);
    }).toThrow('Birth date must be a date or a string.');
  });
});
