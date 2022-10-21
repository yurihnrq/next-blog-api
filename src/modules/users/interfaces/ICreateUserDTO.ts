export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  birthDate: Date | string;
  biography?: string;
}
