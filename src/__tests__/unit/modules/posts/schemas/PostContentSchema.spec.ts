import { PostContentSchema } from '@src/modules/posts/schemas/PostContentSchema';

describe('PostContentSchema', () => {
  it('should parse a valid content', () => {
    expect(() => {
      PostContentSchema.parse('New content');
    }).not.toThrow();
  });

  it('should throw an error if content is not provided', () => {
    expect(() => {
      PostContentSchema.parse(undefined);
    }).toThrow('Content is required.');
  });

  it('should throw an error if content is not a string', () => {
    expect(() => {
      PostContentSchema.parse(12345678);
    }).toThrow('Content must be a string.');
  });
});
