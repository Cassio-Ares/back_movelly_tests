import { database } from "../../database";
import { ReviewsPrismaRepository } from "../../database/prisma/repositories/reviews.prisma.repository";
import { UsersPrismaRepository } from "../../database/prisma/repositories/users.prisma.repository";
import { ReviewsController } from "../reviews.controller";

export const reviewsControllerFactory = {
  make: () => {
    const prismaProvider = database.providers.prisma;
    const usersRepository = new UsersPrismaRepository(prismaProvider);
    const reviewsRepository = new ReviewsPrismaRepository(prismaProvider);
    return new ReviewsController(usersRepository, reviewsRepository);
  }

}
