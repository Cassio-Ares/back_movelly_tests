import { PrismaService } from "./prisma/prisma.service";

export const database = {
  providers: {
    prisma: new PrismaService(),
  }
}
