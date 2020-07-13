import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from "./CreateUserService";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

const name = 'John Doe';
const email = 'jd@example.com';
const password = '123456';

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able create a new user', async () => {
    const user = await createUser.execute({ name, email, password });
    expect(user).toHaveProperty('id');
  })

  it('should not be able create a new user with same email', async () => {
    await createUser.execute({ name, email, password });
    await expect(createUser.execute({ name, email, password })).rejects.toBeInstanceOf(AppError);
  })

})
