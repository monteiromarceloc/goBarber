import { inject, injectable } from 'tsyringe'
import path from 'path'
import fs from 'fs'
import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('Only authenticated user can change avatar.', 401)

    if (user.avatar) {
      const filePath = path.join(uploadConfig.directory, user.avatar);
      const fileExists = await fs.promises.stat(filePath)
      console.log('file: ', filePath, fileExists)
      if (fileExists) await fs.promises.unlink(filePath)
    }
    user.avatar = avatarFilename;
    await this.usersRepository.update(user);
    return user;
  }

}

export default UpdateUserAvatarService
