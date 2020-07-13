import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';
import UserAvatarController from '../controllers/UserAvatarController';

const profileRouter = Router();
const usersController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', usersController.show);
profileRouter.put('/', usersController.update);

export default profileRouter;
