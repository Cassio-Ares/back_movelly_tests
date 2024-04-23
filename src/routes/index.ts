import { Router } from 'express';
import { sessionMiddleware } from '../middlewares/session.middleware';
import { reviewsControllerFactory } from '../controllers/factories/make-reviews.controller.factory';
import { sessionsControllerFactory } from '../controllers/factories/make-sessions.controller.factory';
import { usersControllerFactory } from '../controllers/factories/make-users.controller.factory';

export const routes = Router();

const reviewsController = reviewsControllerFactory.make();
const sessionsController = sessionsControllerFactory.make();
const usersController = usersControllerFactory.make();

routes.post('/reviews', sessionMiddleware, reviewsController.create);
routes.get('/reviews', reviewsController.list);

routes.post('/sessions', sessionsController.create);

routes.post('/users', usersController.create);
routes.get('/users', usersController.list);
