import { Post } from '@src/modules/common/interfaces/Post';

export interface GetUserPostsService {
  execute(authorId: string, page: number): Promise<Post[]>;
}
