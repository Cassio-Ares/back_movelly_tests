import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { NotFoundError } from "../errors/not-found.error";
import { UsersRepositoryInterface } from "../interfaces/users-repository.interface";

interface CreateUserUsecaseParams {
  username: string;
  password: string;
}

export class CreateUserUsecase {
  constructor(private readonly usersRepository: UsersRepositoryInterface) {}

  public async execute({
    username,
    password,
  }: CreateUserUsecaseParams) {
    const userWithSameUsername = await this.usersRepository.findByUsername(username);

    if (userWithSameUsername) {
      throw new NotFoundError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);

    return user;
  }
}
