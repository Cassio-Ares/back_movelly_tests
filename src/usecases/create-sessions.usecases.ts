import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { DBConnection } from '../database';

export class CreateSessionUseCase {
  constructor(private dbconnection: DBConnection) {}

  public async execute(username:string, password:string){
    const user = await this.dbconnection.users.findOne( username );

    if(!user){
       return {
        message: "User not found",
        status: 404,
       }
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if(!isPasswordMatching){
        return {
            message: "User not found",
            status: 401,
           }
    }

    const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );

      delete user.password;

      return {
        token, 
        user
      }
  }

}

