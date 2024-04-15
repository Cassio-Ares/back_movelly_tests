import { Request, Response } from 'express';
import { DBConnection } from '../database';
import { CreateSessionUseCase } from '../usecases/create-sessions.usecases';

export class SessionsController {
  constructor(private readonly dbconnection: DBConnection) {}

  public create = async (request: Request, response: Response): Promise<Response> => {
    const {
      username,
      password
    } = request.body;

    const createSessionUseCase = new CreateSessionUseCase( this.dbconnection);

    const res = await createSessionUseCase.execute(username, password);

    return response.status(201).json({
      token: res.token,
      user: res.user,
    });
  }
}


/**
 * Diferente da controller de create-user onde toda a logica está no proprio controller aqui
 * nos criamos uma outra metodologia onde criamos uma create-session.usercase onde colocamos as logicas em uma class
 * e chamamos a class aqui e intanciamos:
 * 
 *           const createSessionUseCase = new CreateSessionUseCase( this.dbconnection);
 * 
 * e usamos aqui:
 * 
 *           const res = await createSessionUseCase.execute(username, password);   
 * 
 *         return response.status(201).json({
 *                                token: res.token,
 *                                user: res.user,
 *                                 });
 * 
 */