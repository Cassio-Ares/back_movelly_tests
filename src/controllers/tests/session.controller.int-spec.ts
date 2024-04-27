import { Request, Response } from "express";
import { database } from "../../database";
import { PrismaService } from "../../database/prisma/prisma.service";
import { ClassResponseFake } from "./fakes/responseFake";
import { SessionsController } from "../sessions.controller";
import { sessionsControllerFactory } from "../factories/make-sessions.controller.factory";
import  bcrypt from "bcrypt";
import { NotFoundError } from "../../errors/not-found.error";
import { UnauthorizedError } from "../../errors/unauthorized.ero";

 /** começamos connectando o banco de dados com o beforeAll  */
    let prismaService: PrismaService;
    let sessionController: SessionsController;
    let response: Response;


describe('UsersController [int]', () => {
     beforeAll(async () => {
        await database.providers.prisma.connect();
        prismaService = database.providers.prisma;
    });

    beforeEach(() => {
        /** ao inves de instanciar a class userController nos usamos o Factory */
        sessionController= sessionsControllerFactory.make();
        response = new ClassResponseFake() as unknown as Response;
    });

    afterEach(async () => {
      await prismaService.reset();
    })

    afterAll(async () => {
      await prismaService.disconnect();
    })

    it('should to defined', ()=>{
        expect(sessionController).toBeDefined();
    })

    it('should be defined', ()=>{
      expect(sessionController).toBeDefined();
    })

    describe('create', () => { 
      it('should be able to created a session', async () => {
         const request = {
            body:{
               username: 'name',
               password: '123'
            }
         } as Request;

         const password = await bcrypt.hash(request.body.password, 10)

         await prismaService.users.create({
            data:{
               username: 'name',
               password: password,
               id: 'id',
            }
         })

         await sessionController.create(request, response);

         const token = response['jsonResult'].token;
         const user = response['jsonResult'].user

        expect(user).toBeDefined();
        expect(token).toBeDefined();
         
      });

      it('should not be able to created a session with a not existent user', async () => {
         const request = {
            body:{
               username: 'name',
               password: '123'
            }
         } as Request;

        await expect(sessionController.create(request, response)).rejects.toBeInstanceOf(NotFoundError);         
      });

      it('should not be able to created a session if password is not matching', async () => {
         const request = {
            body:{
               username: 'name',
               password: '123'
            }
         } as Request;

          await prismaService.users.create({
            data:{
               username: 'name',
               password: 'incorrect password',
               id: 'id',
            }
         })
         await expect( sessionController.create(request, response)).rejects.toBeInstanceOf(UnauthorizedError);
      });
     })
 });