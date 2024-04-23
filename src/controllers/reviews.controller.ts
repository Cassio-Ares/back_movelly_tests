import { Request, Response } from 'express';
import { DBConnection } from '../database';
import { Review } from '../models/review.model';
import { CreateReviewUsecase } from '../usecases/create-review.usecase';


export class ReviewsController {
  constructor(private readonly dbconnection: DBConnection) {}

  public create = async (request: Request, response: Response): Promise<Response> => {
    const {
      movie,
      comment,
      rating,
      imageUrl,
    } = request.body;

    const userId = request['user'].id;

  const createReviewUsecase = new CreateReviewUsecase(this.dbconnection);

  await createReviewUsecase.execute({
      movie,
      comment,
      rating,
      userId,
      imageUrl,
  })

    return response.status(201).json({
      message: 'Review created successfully',
      statusCode: 201,
    });
  }

  public list = async (request: Request, response: Response): Promise<Response> => {
    const query = request.query as Pick<Review, 'userId'>;
    const reviews = await this.dbconnection.reviews.list(query);
    return response.status(200).json(reviews);
  }
}
