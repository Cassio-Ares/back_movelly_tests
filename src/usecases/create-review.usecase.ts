import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/not-found.error";
import { ReviewsRepositoryInterface } from "../interfaces/reviews-repository.interface";
import { UsersRepositoryInterface } from "../interfaces/users-repository.interface";
import { Review } from "../models/review.model";

interface CreateReviewUsecaseParams {
  movie: string;
  comment: string;
  rating: number;
  userId: string;
  imageUrl: string;
}

export class CreateReviewUsecase {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
     private readonly reviewsRepository: ReviewsRepositoryInterface,
  ) {}

  public async execute({
    comment,
    imageUrl,
    movie,
    rating,
    userId
   }: CreateReviewUsecaseParams) {
    const user = await this.usersRepository.findById(
      userId,
    );

    if (!user) throw new NotFoundError('User not found for the provided id');

    const review = new Review({
      movie,
      comment,
      rating,
      userId,
      imageUrl,
    });

    const myReviews = await this.reviewsRepository.list({
      userId,
    });

    const sameMovieReview = myReviews.find(r => r.movie === review.movie);

      if (sameMovieReview) throw new ConflictError('You have already created a review to this movie');

    await this.reviewsRepository.create(review);

    return review;
  }
}
