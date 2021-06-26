import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { ListUsersController } from '../controllers/ListUsersController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.get('/', ensureAuthenticated, listUsersController.handle);
usersRoutes.post('/', createUserController.handle);

export { usersRoutes };
