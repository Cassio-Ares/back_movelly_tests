import { database } from "../../database";
import { UsersPrismaRepository } from "../../database/prisma/repositories/users.prisma.repository";
import { UsersController } from "../users.controller";

export const usersControllerFactory = {
  make: () => {
    const prismaProvider = database.providers.prisma;
    const usersRepository = new UsersPrismaRepository(prismaProvider);
    return new UsersController(usersRepository);
  }

}
