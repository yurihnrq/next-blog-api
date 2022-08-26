export interface IPost {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string | Date;
  updatedAt: string | Date | null;
}
