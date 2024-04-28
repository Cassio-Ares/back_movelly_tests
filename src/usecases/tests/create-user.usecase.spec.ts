import { ConflictError } from '../../errors/conflict.error';
import { NotFoundError } from '../../errors/not-found.error';
import { UsersRepositoryInterface } from '../../interfaces/users-repository.interface';
import { User } from '../../models/user.model';
import { CreateUserUsecase } from '../create-user.usecase';

async function findByUsername(_: string) {
  return null;
}

async function create(_: User) {
  return null;
}

const mockUsersRepository = {
  findByUsername,
  create
} as UsersRepositoryInterface;

describe("UsersController", () => {
  it("deve ser capaz de criar um usuario", async () => {
    const createUserUsecase = new CreateUserUsecase(mockUsersRepository);

    const user = await createUserUsecase.execute({ username: 'claudinho', password: 'senha123' });

    expect((user as User).username).toBe('claudinho');
  });

  it("should not be able to create an user if there is already a user with same username", async () => {
    mockUsersRepository.findByUsername = async (username: string) => {
      return {
        username,
      } as User
    };

    const createUserUsecase = new CreateUserUsecase(mockUsersRepository);

    await expect(
      createUserUsecase.execute({ username: 'claudinho', password: 'senha123' })
    ).rejects.toBeInstanceOf(ConflictError)
  });
})

