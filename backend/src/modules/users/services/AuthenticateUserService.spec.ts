import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from "./CreateUserService";
import AuthenticateUserService from "./AuthenticateUserService";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

const name = 'John Doe';
const email = 'jd@example.com';
const password = '123456';

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({ name, email, password })
    const response = await authenticateUser.execute({ email, password });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(authenticateUser.execute({ email, password }))
      .rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({ name, email, password })
    await expect(authenticateUser.execute({ email, password: 'wrong' }))
      .rejects.toBeInstanceOf(AppError);
  })
})
