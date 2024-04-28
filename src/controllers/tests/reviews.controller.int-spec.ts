import { Request, Response } from "express";
import { database } from "../../database";
import { PrismaService } from "../../database/prisma/prisma.service";
import { ClassResponseFake } from "./fakes/responseFake";
import { ReviewsController } from "../reviews.controller";
import { reviewsControllerFactory } from "../factories/make-reviews.controller.factory";


 /** começamos connectando o banco de dados com o beforeAll  */
    let prismaService: PrismaService;
    let reviewsController: ReviewsController;
    let response: Response;


describe('UsersController [int]', () => {
     beforeAll(async () => {
        await database.providers.prisma.connect();
        prismaService = database.providers.prisma;
        await prismaService.reset();
    });

    beforeEach(() => {
        /** ao inves de instanciar a class userController nos usamos o Factory */
        reviewsController=  reviewsControllerFactory.make();
        response = new ClassResponseFake() as unknown as Response;
    });

    afterEach(async () => {
      await prismaService.reset();
    })

    afterAll(async () => {
      await prismaService.reset();
      await prismaService.disconnect();
    })

    it('should to defined', ()=>{
        expect(reviewsController).toBeDefined();
    })
 });