import { Router } from 'express';
import { complimentsRoutes } from './compliments.routes';
import { sessionsRoutes } from './sessions.routes';
import { tagsRoutes } from './tags.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/compliments', complimentsRoutes);

export { routes };
