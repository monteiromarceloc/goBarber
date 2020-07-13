import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from "./ShowProfileService";
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

const name = 'John Doe';
const email = 'jd@example.com';
const password = '123456';
let user: User;

describe('ShowProfile', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
    user = await fakeUsersRepository.create({ name, email, password })
  });

  it('should be able to show the profile', async () => {
    const gotUser = await showProfile.execute({
      user_id: user.id,
    })
    expect(gotUser.name).toBe(name);
    expect(gotUser.email).toBe(email);
  })

  it('should not be able to show the profile from non existing user', async () => {
    expect(showProfile.execute({
      user_id: 'non-existing -id',
    })).rejects.toBeInstanceOf(AppError);
  })
})
