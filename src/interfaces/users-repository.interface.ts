import { User } from "../models/user.model";

export interface UsersRepositoryInterface {
  create: (data: User) => Promise<User>;
  list: () => Promise<User[]>;
  findById: (id: string) => Promise<User | undefined>;
  findByUsername: (username: string) => Promise<User | undefined>;
}
