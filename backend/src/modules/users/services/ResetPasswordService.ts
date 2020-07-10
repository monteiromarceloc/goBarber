import { inject, injectable } from 'tsyringe'
import { differenceInHours } from "date-fns";
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokenRepository from '../repositories/IUserTokensRepository'
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) throw new AppError('User token does not exists');

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) throw new AppError('User does not exists');

    if (differenceInHours(Date.now(), userToken.created_at) > 2) { // can be done with addHours
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.update(user);
  }
}

export default SendForgotPasswordEmailService
