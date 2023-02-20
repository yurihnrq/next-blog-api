import { PostTitleSchema } from '@src/modules/posts/schemas/PostTitleSchema';

describe('PostTitleSchema', () => {
  it('should parse a valid title', () => {
    expect(() => {
      PostTitleSchema.parse('New title');
    }).not.toThrow();
  });

  it('should throw an error if title is not provided', () => {
    expect(() => {
      PostTitleSchema.parse(undefined);
    }).toThrow('Title is required.');
  });

  it('should throw an error if title is not a string', () => {
    expect(() => {
      PostTitleSchema.parse(12345678);
    }).toThrow('Title must be a string.');
  });
});
