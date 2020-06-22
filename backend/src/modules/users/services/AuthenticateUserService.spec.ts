import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from "./CreateUserService";
import AuthenticateUserService from "./AuthenticateUserService";
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);
    const createUser = new CreateUserService(fakeUsersRepository);
    const name = 'John Doe';
    const email = 'jd@example.com';
    const password = '123456';
    await createUser.execute({ name, email, password })
    const user = await authenticateUser.execute({ email, password });
    expect(user).toHaveProperty('token');
  })
})
