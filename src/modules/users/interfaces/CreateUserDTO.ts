export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  birthDate: Date | string;
  biography: string | null;
}
