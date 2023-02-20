import { UserBiographySchema } from '@src/modules/users/schemas/UserBiographySchema';

describe('UserBiographySchema', () => {
  it('should parse a valid biography', () => {
    expect(() => {
      UserBiographySchema.parse('New biography');
    }).not.toThrow();
  });

  it('should parse a null biography', () => {
    expect(() => {
      UserBiographySchema.parse(null);
    }).not.toThrow();
  });
});
