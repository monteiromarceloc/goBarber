import { getRepository, Repository } from 'typeorm'
import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>; // tipagem

  constructor() {
    this.ormRepository = getRepository(User) // busca e define o repositorio
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const newUser = this.ormRepository.create(userData);
    await this.ormRepository.save(newUser);
    return newUser;
  }

  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    });
    return user;
  }
}

export default UsersRepository;
