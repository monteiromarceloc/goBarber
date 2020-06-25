import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from "./CreateUserService";
import AuthenticateUserService from "./AuthenticateUserService";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    const name = 'John Doe';
    const email = 'jd@example.com';
    const password = '123456';
    const user = await createUser.execute({ name, email, password })
    const response = await authenticateUser.execute({ email, password });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })
})
