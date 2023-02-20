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

  it('should throw an error if biography is not a string', () => {
    expect(() => {
      UserBiographySchema.parse(12345678);
    }).toThrow('Biography must be a string.');
  });
});
