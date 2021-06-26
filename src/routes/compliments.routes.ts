import { Router } from 'express';
import { CreateComplimentController } from '../controllers/CreateComplimentController';
import { ListUserReceivedComplimentsController } from '../controllers/ListUserReceivedComplimentsController';
import { ListUserSentComplimentsController } from '../controllers/ListUserSentComplimentsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const complimentsRoutes = Router();
const createComplimentController = new CreateComplimentController();
const listUserReceivedComplimentsController =
  new ListUserReceivedComplimentsController();
const listUserSentComplimentsController =
  new ListUserSentComplimentsController();

complimentsRoutes.use(ensureAuthenticated);

complimentsRoutes.get(
  '/received',
  listUserReceivedComplimentsController.handle,
);
complimentsRoutes.get('/sent', listUserSentComplimentsController.handle);
complimentsRoutes.post('/', createComplimentController.handle);

export { complimentsRoutes };
