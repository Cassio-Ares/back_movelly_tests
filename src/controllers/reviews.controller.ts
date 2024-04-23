import { Request, Response } from 'express';
import { Review } from '../models/review.model';
import { CreateReviewUsecase } from '../usecases/create-review.usecase';
import { UsersRepositoryInterface } from '../interfaces/users-repository.interface';
import { ReviewsRepositoryInterface } from '../interfaces/reviews-repository.interface';

export class ReviewsController {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly reviewsRepository: ReviewsRepositoryInterface,
  ) {}

    public create = async (request: Request, response: Response): Promise<Response> => {
    const {
      movie,
      comment,
      rating,
      imageUrl,
    } = request.body;

    const userId = request['user'].id;

    const createReviewUsecase = new CreateReviewUsecase(
      this.usersRepository,
      this.reviewsRepository,
    );

    await createReviewUsecase.execute({
      movie,
      comment,
      rating,
      imageUrl,
      userId,
    })

    return response.status(201).json({
      message: 'Review created successfully',
      statusCode: 201,
    });
  }

  public list = async (request: Request, response: Response): Promise<Response> => {
    const query = request.query as Pick<Review, 'userId'>;
    const reviews = await this.reviewsRepository.list(query);
    return response.status(200).json(reviews);
  }
}
