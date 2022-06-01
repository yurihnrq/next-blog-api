import { users as usersMock } from '../../../../../mocks/users';
import { ILoginServices } from '../../../../../modules/login/interfaces';
import { LoginJwtServices } from '../../../../../modules/login/services/LoginJwtServices';
import bcrypt from 'bcrypt';

const loginServices: ILoginServices = new LoginJwtServices();

describe('LoginJwtServices', () => {
  it('should generate a token', () => {
    process.env.JWT_SECRET = 'test-secret';

    const token = loginServices.generateToken(usersMock[0]);

    expect(token).toBeDefined();
  });

  it('should return true if password is valid', () => {
    const password = 'test-password';
    const userPassword = bcrypt.hashSync(password, 10);

    const isValid = loginServices.validatePassword(password, userPassword);

    expect(isValid).toBeTruthy();
  });

  it('should return false if password is invalid', () => {
    const password = 'test-password';
    const userPassword = 'invalid-password-hash';

    const isValid = loginServices.validatePassword(password, userPassword);

    expect(isValid).toBeFalsy();
  });
});
