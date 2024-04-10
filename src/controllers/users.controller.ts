import { Request, Response } from 'express';
import { DBConnection } from '../database';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
export class UsersController {
  constructor(private readonly dbconnection: DBConnection) {}

  public create = async (request: Request, response: Response): Promise<Response> => {
    const {
      username,
      password,
    } = request.body;

    const userWithSameUsername = await this.dbconnection.users.findOne(username);

    if (userWithSameUsername) {
      return response.status(409).json({
        message: 'User already exists',
        statusCode: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await this.dbconnection.users.create(user);

    return response.status(201).json({
      message: 'User created successfully',
      statusCode: 201,
    });
  }

  public list = async (_: Request, response: Response): Promise<Response> => {
    const users = await this.dbconnection.users.list();
    return response.status(200).json(users);
  }
}
