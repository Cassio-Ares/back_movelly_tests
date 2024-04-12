import { DBConnection } from "../database";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
/**
 * isolamento da class userController.create para poder testar
 */

interface CreateUserUserParams{
    username: string,
    password: string
}
export class CreateUseCaseClass{
    constructor(private dbconnection: DBConnection) {}

    public async execute({username, password}: CreateUserUserParams){
        const userWithSameUsername = await this.dbconnection.users.findOne(username);
        
        if (userWithSameUsername) {
            return ({
              message: 'User already exists',
              statusCode: 409,
            });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const user = new User({
            username,
            password: hashedPassword,
          });
      
          await this.dbconnection.users.create(user);

          return user;
      
    };
}

/**
 * ex usando função ao inves de class duas formas diferentes para o mesmo resultado 
 * @param username 
 * @param password 
 * @param dbconnection 
 * @returns 
 */

export async  function createUserFunction(username: string, password: string, dbconnection: DBConnection){
    const userWithSameUsername = await dbconnection.users.findOne(username);
        
    if (userWithSameUsername) {
        return ({
          message: 'User already exists',
          statusCode: 409,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        password: hashedPassword,
      });
  
      await dbconnection.users.create(user);

      return user;
}