import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const sessionMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization.split(' ')[1];
  if (!token) {
    return response.status(401).json({ message: 'No auth token sent!' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request['user'] = decoded;
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Unauthorized' });
  }
}
