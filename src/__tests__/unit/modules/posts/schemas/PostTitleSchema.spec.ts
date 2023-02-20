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

  it('should throw an error if title is too short', () => {
    expect(() => {
      PostTitleSchema.parse('123');
    }).toThrow('Title must be at least 4 characters long.');
  });

  it('should throw an error if title is too long', () => {
    expect(() => {
      PostTitleSchema.parse('1'.repeat(256));
    }).toThrow('Title must be at most 255 characters long.');
  });
});
