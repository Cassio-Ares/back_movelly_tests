import { Request, Response } from "express";
import { database } from "../../database";
import { PrismaService } from "../../database/prisma/prisma.service";
import { ClassResponseFake } from "./fakes/responseFake";
import { ReviewsController } from "../reviews.controller";
import { reviewsControllerFactory } from "../factories/make-reviews.controller.factory";
import { NotFoundError } from "../../errors/not-found.error";
import { ConflictError } from "../../errors/conflict.error";


 /** começamos connectando o banco de dados com o beforeAll  */
    let prismaService: PrismaService;
    let reviewsController: ReviewsController;
    let response: Response;


describe('UsersController [int]', () => {
     beforeAll(async () => {
        await database.providers.prisma.connect();
        prismaService = database.providers.prisma;
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
      await prismaService.disconnect();
    })

    it('should to defined', ()=>{
        expect(reviewsController).toBeDefined();
    })

    describe('create', () => {
      it('should be able to create a review ', async () => {
        const request = {
          body:{
            movie: "movie",
            comment: "comment",
            rating: 5,
            imageUrl: "http://",
          }
        } as Request;

       const user = await prismaService.users.create({
          data:{
            id: 'id',
            username: 'username',
            password: 'password',
          }
        });

        request['user'] = user;

        await reviewsController.create(request, response);

        const review = await prismaService.reviews.findMany(); // me traga todos os reviews 

        expect(review[0].id).toBeDefined();
      });

      it('should not be able to create a review with a invalid user ', async () => {
        const request = {
          body:{
            movie: "movie",
            comment: "comment",
            rating: 5,
            imageUrl: "http://",
          }
        } as Request;

        request['user'] = {
          id: 'invalid id',
        }

        await expect( reviewsController.create(request, response)).rejects.toBeInstanceOf(NotFoundError);
      });

      it('should be able to create a duplicated review ', async () => {
      const request = {
        body:{
          movie: "movie",
          comment: "comment",
          rating: 5,
          imageUrl: "http://",
        }
      } as Request;

     const user = await prismaService.users.create({
        data:{
          id: 'id',
          username: 'username',
          password: 'password',
        }
      });

      request['user'] = user;

      await reviewsController.create(request, response);


     await expect(reviewsController.create(request, response)).rejects.toBeInstanceOf(ConflictError)
    });
    })

    describe('list', () => {
      it('should be able to list all reviews', async () => {
        const request = {
          body:{
            movie: "movie",
            comment: "comment",
            rating: 5,
            imageUrl: "http://",
          }
        } as Request;

       const user = await prismaService.users.create({
          data:{
            id: 'id',
            username: 'username',
            password: 'password',
          }
        });

        request['user'] = user;

        await reviewsController.create(request, response);

       await reviewsController.list(request, response);

       const reviews = response['jsonResult']

       expect(reviews[0].id).toBeDefined();
       expect(reviews.length).toBe(1)
      });
    });

 });