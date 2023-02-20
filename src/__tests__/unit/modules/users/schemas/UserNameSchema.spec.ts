import { UserNameSchema } from '@src/modules/users/schemas/UserNameSchema';

describe('UserNameSchema', () => {
  it('should parse a valid name', () => {
    expect(() => {
      UserNameSchema.parse('John Doe');
    }).not.toThrow();
  });

  it('should throw an error if name is not a string', () => {
    expect(() => {
      UserNameSchema.parse(12345678);
    }).toThrow('Name must be a string.');
  });

  it('should throw an error if name is not provided', () => {
    expect(() => {
      UserNameSchema.parse(undefined);
    }).toThrow('Name is required.');
  });
});
