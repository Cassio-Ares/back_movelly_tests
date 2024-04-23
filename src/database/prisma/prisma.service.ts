import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  public async connect(): Promise<void> {
    await this.$connect();
  }

  public async disconnect(): Promise<void> {
    await this.$disconnect();
  }

  public async reset(): Promise<void> {
    await this.users.deleteMany();
    await this.reviews.deleteMany();
  }
}
