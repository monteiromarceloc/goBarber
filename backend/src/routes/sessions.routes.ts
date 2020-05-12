import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUser = new AuthenticateUserService();
  const { user, token } = await authenticateUser.execute({ email, password })
  const { name } = user
  return response.json({ name, token });
});

export default sessionsRouter;
