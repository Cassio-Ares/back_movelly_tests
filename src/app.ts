import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errorsMiddleware } from './middlewares/errors.middleware';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorsMiddleware);
app.use();

