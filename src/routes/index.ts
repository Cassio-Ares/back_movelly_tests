import { Router } from 'express';
import { ReviewsController } from '../controllers/reviews.controller';
import { SessionsController } from '../controllers/sessions.controller';
import { UsersController } from '../controllers/users.controller';
import { database } from '../database';
import { sessionMiddleware } from '../middlewares/session.middleware';

export const routes = Router();
const connection = database.getConnection();

const reviewsController = new ReviewsController(connection);
const sessionsController = new SessionsController(connection);
const usersController = new UsersController(connection);

routes.post('/reviews', sessionMiddleware, reviewsController.create);
routes.get('/reviews', reviewsController.list);

routes.post('/sessions', sessionsController.create);

routes.post('/users', usersController.create);
routes.get('/users', usersController.list);
