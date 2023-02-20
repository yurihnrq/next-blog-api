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
});
