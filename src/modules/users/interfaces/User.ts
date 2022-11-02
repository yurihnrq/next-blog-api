export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  birthDate: string | Date;
  biography: string | null;
}
