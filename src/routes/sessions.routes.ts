import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';

const sessionsRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

sessionsRoutes.post('/', authenticateUserController.handle);

export { sessionsRoutes };
