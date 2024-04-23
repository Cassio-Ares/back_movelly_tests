import { DBConnection } from "../database";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/not-found.error";
import { Review } from "../models/review.model";

interface CreateReviewUsecaseParams {
  movie: string;
  comment: string;
  rating: number;
  userId: string;
  imageUrl: string;
}

export class CreateReviewsUsecase {
  constructor(private dbconnection: DBConnection) {}

  public async execute({
    movie,
    comment,
    rating,
    userId,
    imageUrl,
  }: CreateReviewUsecaseParams) {
    const user = await this.dbconnection.users.findById(userId);

    if(!user) {
      throw new NotFoundError("User not found", 409)
    }
    const review = new Review({
      movie,
      comment,
      rating,
      userId,
      imageUrl,
    });

    const myReviews = await this.dbconnection.reviews.list({
      userId,
    }) //listando meus reviews

    const sameReview = myReviews.find(review => review.movie === review.movie); //verificar se dentro da lista ja existe um review para este filme

    if(sameReview) throw new ConflictError('Não é possivel criar mais de uma review para o mesmo filme', 409)

    await this.dbconnection.reviews.create(review);

    return review;
  }
}
