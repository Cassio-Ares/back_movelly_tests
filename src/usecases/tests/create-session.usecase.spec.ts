import { NotFoundError } from "../../errors/not-found.error";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { bcrypt } from "../../utils/bcrypt";
import { CreateSessionUseCase } from "../create-sessions.usecases";

async function findOneNull(username: string) {
  return null;
}

async function findOneUser(username: string, password: string) {
  return {
    username,
    password: "password",
  };
}

const users = {
  findOne: findOneNull,
};

const mockDBconnection = {
  users,
} as any;

describe("CreateSessionUseCase", () => {
  it("Não deve ser possivel criar uma sessão de o usuario não existir", async () => {
    const username = "not created";
    const password = "some password";
    const createSessionUsecase = new CreateSessionUseCase(mockDBconnection);

    await expect(
      createSessionUsecase.execute(username, password)
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it("Usuario e password não combinam", async () => {
    mockDBconnection.users.findOne = findOneUser;
    const username = "cassio";
    const password = "some password";
    const createSessionUsecase = new CreateSessionUseCase(mockDBconnection);

    await expect(
      createSessionUsecase.execute(username, password)
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it("Usuario e senha correto, iniciando uma sessão", async () => {
    mockDBconnection.users.findOne = findOneUser;
    jest.spyOn(bcrypt, "compare").mockImplementationOnce(async () => true);

    /**
     * jest.spyOn(bcrypt, "compare").mockImplementationOnce(async ()=> true)
     *
     * para poder usar uma função externa de forma mockada usamos o spyOn
     * aqui usamos este recurso para espionar 1 x a função bcrypt "compare" do nosso utils
     * e como callback damos um return true que é o que nosso função retornaria por a resposta da função é um
     * boolean     
     *          const bcrypt: {
     *               compare: (password: string, toComparePassoword: string) => Promise<boolean>;
     *            }
     */

      process.env.JWT_SECRET="secret";

    /**
     * para criar o token 
     * buscamos o env. que cria o secret do token 
     */

    const username = "Cassio";
    const password = "password";
    const createSessionUsecase = new CreateSessionUseCase(mockDBconnection);

    const res = await createSessionUsecase.execute(username, password);

    expect(res.user.username).toBe(username);
  });
});

//
