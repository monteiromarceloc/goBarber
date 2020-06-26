import { Request, Response } from 'express'
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password;

    return response.json(user);
  }
}
