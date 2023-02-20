import { PostContentSchema } from '@src/modules/posts/schemas/PostContentSchema';

describe('PostContentSchema', () => {
  it('should parse a valid content', () => {
    expect(() => {
      PostContentSchema.parse('New content');
    }).not.toThrow();
  });
});
