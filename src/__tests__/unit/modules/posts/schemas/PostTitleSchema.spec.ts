import { PostTitleSchema } from '@src/modules/posts/schemas/PostTitleSchema';

describe('PostTitleSchema', () => {
  it('should parse a valid title', () => {
    expect(() => {
      PostTitleSchema.parse('New title');
    }).not.toThrow();
  });
});
