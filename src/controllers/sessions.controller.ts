import { Request, Response } from 'express';
import { CreateSessionUsecase } from '../usecases/create-session.usecase';
import { UsersRepositoryInterface } from '../interfaces/users-repository.interface';

export class SessionsController {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  public create = async (request: Request, response: Response): Promise<Response> => {
    const {
      username,
      password
    } = request.body;

    const createSessionUsecase = new CreateSessionUsecase(
      this.usersRepository,
    );

    const res = await createSessionUsecase.execute({
      username,
      password
    });

    return response.status(201).json({
      token: res.token,
      user: res.user,
    });
  }
}
