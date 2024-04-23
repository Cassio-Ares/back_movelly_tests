import { PrismaClient } from "@prisma/client";
import { User } from "../../../models/user.model";
import { UsersRepositoryInterface } from "../../../interfaces/users-repository.interface";

export class UsersPrismaRepository implements UsersRepositoryInterface {
  constructor(private prisma: PrismaClient) {}

  async create(data: User): Promise<User> {
    const user = await this.prisma.users.create({ data });
    return user;
  }

  async list(): Promise<User[]> {
    const users = await this.prisma.users.findMany();
    return users;
  }

  async findById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
    });
    return user;
  }
}
