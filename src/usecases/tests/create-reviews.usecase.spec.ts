import { ConflictError } from "../../errors/conflict.error";
import { NotFoundError } from "../../errors/not-found.error";
import { Review } from "../../models/review.model";
import { User } from "../../models/user.model";
import { CreateReviewsUsecase } from "../create-review.usecase";

async function findByIdNull(username: string){
    return null;
}

async function findByIdUser(username: string){
  return {
    username: username,
    password: "password"
  }
}

async function createReview(_:Review){
  return null;
}

async function listReviews(data: {userId:string}){
  return [{movie:"Duplicate movie title"}];
}

async function listReviewsNull(data: {userId:string}){
  return [];
}

const users = {
    findById: findByIdUser,
  }

  const reviews = {
    create: createReview,
    list: listReviewsNull
  }

  const mockDBConnection = {
    users,
    reviews
  }as any;




describe("CreateReviewsUseCase", () => {
  it("Deve ser capaz de cria um review", async () => {
     const createReviewUseCase = new CreateReviewsUsecase(mockDBConnection);
     
     const createDataReview = {
      movie: "OverLord",
      comment: "10/10",
      rating:5,
      userId: "id",
      imageUrl: "http://imagemdacapadofilme.com/overlord"
     }
     
     const review = await createReviewUseCase.execute( createDataReview )

    expect(review.comment).toBe(createDataReview.comment);
    expect(review.imageUrl).toBe(createDataReview.imageUrl);

  })

  it("User não pode criar mais de um review para o mesmo filme", async () => {
    mockDBConnection.reviews.list = listReviews;
    const createReviewUseCase = new CreateReviewsUsecase(mockDBConnection);
    const createDataReview = {
      movie: "Duplicate movie title",
      comment: "Anime muito top.",
      rating:5,
      userId: "id",
      imageUrl: "http://imagemdacapadofilme.com/overlord"
     }

     await expect(createReviewUseCase.execute(createDataReview)).rejects.toBeInstanceOf(ConflictError)

  })

  it("se o usuario não existir", async () => {

    mockDBConnection.users.findById = findByIdNull;  // seta o user como null.

     const createReviewUseCase = new CreateReviewsUsecase(mockDBConnection);
     const createDataReview = {
      movie: "OverLord",
      comment: "10/10",
      rating:5,
      userId: "id",
      imageUrl: "http://imagemdacapadofilme.com/overlord"
     }

     await expect(createReviewUseCase.execute(createDataReview)).rejects.toBeInstanceOf(NotFoundError)
  })

});