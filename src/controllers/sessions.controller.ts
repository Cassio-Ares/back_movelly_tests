import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { DBConnection } from '../database';

export class SessionsController {
  constructor(private readonly dbconnection: DBConnection) {}

  public create = async (request: Request, response: Response): Promise<Response> => {
    const {
      username,
      password
    } = request.body;

    const user = await this.dbconnection.users.findOne(username);

    if (!user) {
      return response.status(404).json({
        message: 'User not found',
        statusCode: 404,
      })
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      return response.status(401).json({
        message: 'Invalid password',
        statusCode: 401,
      })
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    delete user.password;

    return response.status(201).json({
      token,
      user,
    });
  }
}
