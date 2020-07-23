import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, { id: uuid() }, userData);
    this.users.push(newUser);
    return newUser;
  }

  public async update(user: User): Promise<User> {
    const foundIndex = this.users.findIndex(u => u.id === user.id);
    this.users[foundIndex] = user;
    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find(u => u.id === id);
    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.filter(u => u.email === email)[0];
    return foundUser;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;
    if (except_user_id) {
      users = users.filter(u => u.id !== except_user_id);
    }
    return users;
  }
}

export default FakeUsersRepository;
