import { inject, injectable } from 'tsyringe'

// import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokenRepository from '../repositories/IUserTokensRepository'

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,
  ) { }
  public async execute({ email }: Request): Promise<void> {

    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (!checkUserExists) {
      throw new AppError('User does not exists.');
    }

    await this.userTokensRepository.generate(checkUserExists.id)

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');

  }
}

export default SendForgotPasswordEmailService
