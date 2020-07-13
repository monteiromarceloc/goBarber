import { inject, injectable } from 'tsyringe'

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name?: string;
  email?: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User not found');

    if (email) {
      const userOwsEmail = await this.usersRepository.findByEmail(email);
      if (userOwsEmail && userOwsEmail.id !== user_id) {
        throw new AppError('E-mail already in use')
      }
    }

    if (password) {
      if (!old_password) throw new AppError('Should inform old password');
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);
      if (!checkOldPassword) throw new AppError('Old password does not match');
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await this.hashProvider.generateHash(password)

    return this.usersRepository.update(user);
  }
}

export default UpdateProfileService
