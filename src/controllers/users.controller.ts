import { Request, Response } from 'express';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { UsersRepositoryInterface } from '../interfaces/users-repository.interface';
export class UsersController {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}


  public create = async (request: Request, response: Response): Promise<Response> => {
    const {
      username,
      password,
    } = request.body;

    const createUserUsecase = new CreateUserUsecase(
      this.usersRepository,
    );

    await createUserUsecase.execute({ username, password });

    return response.status(201).json({
      message: 'User created successfully',
      statusCode: 201,
    });
  }

  public list = async (_: Request, response: Response): Promise<Response> => {
    const users = await this.usersRepository.list();

    const serializedUsers = users.map(user => {
      const {
        id,
        username
      } = user;

      return { id, username };
    })

    return response.status(200).json(serializedUsers);
  }
}
