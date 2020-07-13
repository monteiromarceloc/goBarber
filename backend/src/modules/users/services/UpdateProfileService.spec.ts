import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from "./UpdateProfileService";
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

const name = 'John Doe';
const email = 'jd@example.com';
const password = '123456';
let user: User;

describe('UpdateProfile', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
    user = await fakeUsersRepository.create({ name, email, password })
  });

  it('should be able to update the profile', async () => {
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com'
    })
    expect(updatedUser.name).toBe('John Tre');
  })

  it('should not be able to change to another user\'s email', async () => {
    await fakeUsersRepository.create({ name: 'John Tre', email: 'johntre@example.com', password: '123123' })
    await expect(updateProfile.execute({
      user_id: user.id,
      email: 'johntre@example.com'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should be able to update the password', async () => {
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      old_password: password,
      password: '123123',
    })
    expect(updatedUser.password).toBe('123123');
  })

  it('should not be able to update password without old password', async () => {
    await expect(updateProfile.execute({
      user_id: user.id,
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to update password with wrong old password', async () => {
    await expect(updateProfile.execute({
      user_id: user.id,
      password: '123123',
      old_password: 'wrongpassword',
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to update the profile from non existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-id',
      name: 'Test',
      email: 'test@test.com'
    })).rejects.toBeInstanceOf(AppError);
  })
})
