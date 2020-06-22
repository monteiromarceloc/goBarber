import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from "./CreateUserService";
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const name = 'John Doe';
    const email = 'jd@example.com';
    const password = '123456';
    const user = await createUser.execute({ name, email, password });
    expect(user).toHaveProperty('id');
  })

  it('should not be able create a new user with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const name = 'John Doe';
    const email = 'jd@example.com';
    const password = '123456';
    await createUser.execute({ name, email, password });
    expect(createUser.execute({ name, email, password })).rejects.toBeInstanceOf(AppError);
  })

})
