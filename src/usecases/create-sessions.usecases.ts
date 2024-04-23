import jwt from "jsonwebtoken";
import { DBConnection } from "../database";
import { NotFoundError } from "../errors/not-found.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { bcrypt } from "../utils/bcrypt"; // bcrypt encapsulado por mim.

export class CreateSessionUseCase {
  constructor(private dbconnection: DBConnection) {}

  public async execute(username: string, password: string) {
    const user = await this.dbconnection.users.findOne(username);

    // if(!user){
    //    return {
    //     message: "User not found",
    //     status: 404,
    //    }
    // }

    if (!user) {
      throw new NotFoundError("User not found", 404)
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedError("Username or password is not matching", 401);
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    delete user.password;

    return {
      token,
      user,
    };
  }
}

/**
 * ao inves de trabalhar com varios retornos 
 * para melhorar a sintaxe e deixar o codigo mais limpo 
 * podemos usar o express-async error
 * e mudar de:
 *     if(!user){
 *     return {
 *     message: "User not found",
 *     status: 404,
 *        }
 *      }
 *
 * para isso:
 *
 *        if(!user){
 *          throw new Error( "User not found" );
 *        }
 */
