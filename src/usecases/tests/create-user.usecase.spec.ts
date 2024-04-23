import { User } from "../../models/user.model";
import { createUserFunction } from "../create-user.usecase";

async function findOne(username: string, password: string) {
    return null;
 }

 async function create(user: User) {
     return null;
  }

 const users ={
     findOne,
     create,
 }

 const mockDBconnection = {
   users,
 } as any;

describe("UserController", () => {

  it("Deve ser capaz de criar um usuario", async () => {
   
    const user = await createUserFunction("Cassio", "senha123", mockDBconnection);

    /**
     * expect(user.username) falha ao usar só o username pq o ts não reconhece
     * usando o as User dizemos ao sistema trate user como do type User
     *  */

    expect((user as User).username).toBe("Cassio");
  });

  it("não deve ser capaz de criar o usuario se o username já existir um igual no banco de dados", async () => {
    /**
     * ao inves de criar um novo mock nos só usamos o mock já criado e mudamos o resultado do findOne
     * @param username 
     * @returns 
     */

   mockDBconnection.users.findOne = (username: string) => {
    return{
      username,
    }
   };

   const res = await createUserFunction("Cassio", "senha123", mockDBconnection);

   expect(res["statusCode"]).toBe(409);
   expect(res["message"]).toBe("User already exists");


   /**
    * Formas diferentes de chamar dados no expect() 
    * 
    *                 expect((user as User) ou expect(res["message"])
    * 
    */
    
  });
});

/**
 * Mock do banco de dados:
 * 
 * mock nada mais é doque uma estrutura que simula algo:
 * 
 * ex: aqui precisavamos de um findOne que é uma "função" de dbconnection
 * 
 * então simulamos um findOne e um dbconnection o usando.
 * 
 *                   aqui returna null para testar quando só criamos um user
 * 
 *  async function findOne(username:string, password:string){
 *         return null
 *      }
 * 
 * async function create(user:User){
 *         return null
 *      }
 *
 *      const users = {
 *                findOne,
 *                create,
 *      }
 * 
 *       const dbconnection = {
 *         users
 *     } as any;
 * 
 *
 *              aqui retorna um user para simular que o nome ja existe no BD
 * 
 * 
 *   async function findOne(username:string, password:string){
 *         const user = {username: username, password:'senha123'}
 *
 *           return user
 *      }
 * 
 *     async function create(user:User){
 *         return null
 *      }
 * 
 * 
 *         const users = {
 *                findOne,
 *                create
 *      }
 * 
 *       const dbconnection = {
 *         users
 *     } as any;
 * 
 * 
 * 
 */
