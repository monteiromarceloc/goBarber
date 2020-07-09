import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../../infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

class FakeUserTokensRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const newUserToken = new UserToken();
    Object.assign(newUserToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });
    this.userTokens.push(newUserToken);
    return newUserToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(e => e.token === token);
    return userToken;
  }
}

export default FakeUserTokensRepository;
