import { User } from "../models/user.model";

export interface UsersRepositoryInterface {
  create: (data: User) => Promise<User>;
  list: () => Promise<User[]>;
  findById: (id: string) => Promise<User | undefined>;
  findByUsername: (username: string) => Promise<User | undefined>;
}


/**
 * Aqui criamos uma interface que irá limitar os modelos de acesso onde ela for usada 
 * ex: 
 *    olhar a create-user.usecase.ts onde os metodos create, list, findById e findByUsername são usados 
 * 
 * alem disso esta interface tbm é usada na class UsersPrismaRepository implements UsersRepositoryInterface
 * 
 * onde estes metodos são implementados.
 */