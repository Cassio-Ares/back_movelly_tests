import { database } from "../../database";
import { UsersPrismaRepository } from "../../database/prisma/repositories/users.prisma.repository";
import { SessionsController } from "../sessions.controller";

export const sessionsControllerFactory = {
  make: () => {
    const prismaProvider = database.providers.prisma;
    const usersRepository = new UsersPrismaRepository(prismaProvider);
    return new SessionsController(usersRepository);
  }
}
