import { Request, Response } from "express";
import { database } from "../../database";
import { PrismaService } from "../../database/prisma/prisma.service";
import { usersControllerFactory } from "../factories/make-users.controller.factory";
import { UsersController } from "../users.controller";

 /** começamos connectando o banco de dados com o beforeAll  */
    let prismaService: PrismaService;
    let usersController: UsersController;

/**fakeResponse simula o response  */
    const fakeResponse = {
        status: (code:number) => fakeResponse,
        json:(data:any) => fakeResponse
    } as Response;

describe('UsersController [int]', () => {
 

    beforeAll(async () => {
    
        
        await database.providers.prisma.connect();
        prismaService = database.providers.prisma;
    });

    beforeEach(() => {
        /** ao inves de instanciar a class userController nos usamos o Factory */
        usersController = usersControllerFactory.make()
    });

    it('should to defined', ()=>{
        expect(usersController).toBeDefined();
    })
    

    describe('create', () => {
        it('should create an user', async () => {
            //arrange
            const request = {
                body:{
                    username: 'name',
                    password: 'password'
                }
            } as Request

            //act
            await usersController.create(request, fakeResponse)
            
            //assert
            const user = await prismaService.users.findUnique({
                where:{
                    username: 'name',
                }
            })

            expect(user).toBeDefined();
        });
    });
});