import jwt from 'jsonwebtoken';
import { NotFoundError } from "../errors/not-found.error";
import { UnauthorizedError } from "../errors/unauthorized.ero";
import { bcrypt } from "../utils/bcrypt";
import { UsersRepositoryInterface } from "../interfaces/users-repository.interface";

interface CreateSessionUsecaseParams {
  username: string;
  password: string;
}

export class CreateSessionUsecase {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  public async execute({
    username,
    password
  }: CreateSessionUsecaseParams) {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundError('User not found!');
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedError('Username or password is not matching');
    }

    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    delete user.password;

    return {
      token,
      user,
    };
  }
}
