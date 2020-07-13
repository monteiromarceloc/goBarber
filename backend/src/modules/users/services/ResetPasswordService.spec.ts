import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import ResetPasswordService from "./ResetPasswordService";
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;


describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeHashProvider
    );
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);
    const generateHashFun = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      token,
      password: '123123'
    });
    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(updatedUser?.password).toBe('123123');
    expect(generateHashFun).toBeCalled();
  });

  it('should not be able to reset the password with non existing token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password for non existing user', async () => {
    const { token } = await fakeUsersTokensRepository.generate('non-existing-user');
    await expect(resetPassword.execute({
      token,
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with expired token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    })

    await expect(resetPassword.execute({
      token,
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  })
});
