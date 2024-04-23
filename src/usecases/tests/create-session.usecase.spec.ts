import { NotFoundError } from "../../errors/not-found.error";
import { UnauthorizedError } from "../../errors/unauthorized.ero";
import { UsersRepositoryInterface } from "../../interfaces/users-repository.interface";
import { User } from "../../models/user.model";
import { bcrypt } from "../../utils/bcrypt";
import { CreateSessionUsecase } from "../create-session.usecase";

async function nullFindByUsername(_: string) {
  return null;
}

async function findByUsername(username: string) {
  return {
    username,
    password: 'password',
  } as User
};

const mockUsersRepository = {
  findByUsername: nullFindByUsername,
} as UsersRepositoryInterface;

describe("CreateSessionUsecase", () => {
  it("should not be able to create a session if there is no user to the provided username", async () => {
    const username = 'not created';
    const password = 'some password';
    const createSessionUsecase = new CreateSessionUsecase(mockUsersRepository);

    await expect(
      createSessionUsecase.execute({ username, password }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should not be able to create a session if username and password is not matching", async () => {
    mockUsersRepository.findByUsername = findByUsername;
    const username = 'not created';
    const password = 'some password';
    const createSessionUsecase = new CreateSessionUsecase(mockUsersRepository);

    await expect(
      createSessionUsecase.execute({ username, password }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it("should be able to create a session", async () => {
    mockUsersRepository.findByUsername = findByUsername;
    jest.spyOn(bcrypt, "compare").mockImplementationOnce(
      async () =>  true,
    );
    process.env.JWT_SECRET = 'secret';
    const username = 'not created';
    const password = 'password';
    const createSessionUsecase = new CreateSessionUsecase(mockUsersRepository);

    const res = await createSessionUsecase.execute({ username, password });

    expect(res.user.username).toBe(username);
  });
});
