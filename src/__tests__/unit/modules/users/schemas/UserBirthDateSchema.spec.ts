import { UserBirthDateSchema } from '@src/modules/users/schemas/UserBirthDateSchema';

describe('UserBirthDateSchema', () => {
  it('shuold parse a valid birth date', () => {
    expect(() => {
      UserBirthDateSchema.parse(new Date());
    }).not.toThrow();
  });
});
