import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from "./ListProvidersService";
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

const name = 'John Doe';
const email = 'jd@example.com';
const password = '123456';
let user: User;
let provider1: User;
let provider2: User;

describe('ListProviders', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
    user = await fakeUsersRepository.create({ name, email, password });
    provider1 = await fakeUsersRepository.create({
      name: "Jhon Tre",
      email: "jt@example.com",
      password: "123456",
    });
    provider2 = await fakeUsersRepository.create({
      name: "Jhon Qua",
      email: "jq@example.com",
      password: "123456",
    });
  });

  it('should be able to list the providers', async () => {
    const providers = await listProviders.execute({
      user_id: user.id,
    })
    expect(providers).toEqual([
      provider1,
      provider2
    ]);
  })

})
