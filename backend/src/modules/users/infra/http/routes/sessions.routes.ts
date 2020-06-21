import { Router } from 'express';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const userRepository = new UserRepository();
  const { email, password } = request.body;
  const authenticateUser = new AuthenticateUserService(userRepository);
  const { user, token } = await authenticateUser.execute({ email, password })
  const { name } = user
  return response.json({ name, token });
});

export default sessionsRouter;
