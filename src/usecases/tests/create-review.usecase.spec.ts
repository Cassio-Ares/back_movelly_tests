import { ConflictError } from '../../errors/conflict.error';
import { NotFoundError } from '../../errors/not-found.error';
import { ReviewsRepositoryInterface } from '../../interfaces/reviews-repository.interface';
import { UsersRepositoryInterface } from '../../interfaces/users-repository.interface';
import { Review } from '../../models/review.model';
import { User } from '../../models/user.model';
import { CreateReviewUsecase } from '../create-review.usecase';

const duplicatedMovieTitle = 'duplicate movie title';

async function findByIdNull(_: string) {
  return null;
};

async function findByIdUser(username: string) {
  return {
    username,
    password: 'password',
  } as User;
}

async function createReview(_: Review) {
  return null;
}

async function listDuplicatedReview(_: { userId: string }) {
  return [{ movie: duplicatedMovieTitle }] as Review[];
}

async function listNull(data: { userId: string }) {
  return [];
}

const mockUsersRepository = {
  findById: findByIdUser,
} as UsersRepositoryInterface;

const mockReviewsRepository = {
  create: createReview,
  list: listNull
} as ReviewsRepositoryInterface;

describe("CreateReviewUsecase", () => {
  beforeEach(() => {
    mockUsersRepository.findById = findByIdUser;
    mockReviewsRepository.list = listNull;
  });

  it("should be able to create a review", async () => {
    mockUsersRepository.findById = findByIdUser;
    const createReviewUsecase = new CreateReviewUsecase(
      mockUsersRepository,
      mockReviewsRepository,
    );
    const createReviewParams = {
      comment: 'show',
      imageUrl: 'https://images/fotolegal.jpeg',
      movie: 'filme da hora',
      rating: 5,
      userId: 'id',
    };

    const review = await createReviewUsecase.execute(createReviewParams);

    expect(review.comment).toBe(createReviewParams.comment)
    expect(review.imageUrl).toBe(createReviewParams.imageUrl)
  });

  it("should not be able to create a review if the user not exists", async () => {
    mockUsersRepository.findById = findByIdNull;
    const createReviewUsecase = new CreateReviewUsecase(
      mockUsersRepository,
      mockReviewsRepository,
    );
    const createReviewParams = {
      comment: 'show',
      imageUrl: 'https://images/fotolegal.jpeg',
      movie: 'filme da hora',
      rating: 5,
      userId: 'id',
    };

    await expect(createReviewUsecase.execute(createReviewParams)).rejects.toBeInstanceOf(NotFoundError)
  });

  it("should not be able to create a duplicated review", async () => {
    mockUsersRepository.findById = findByIdUser;
    mockReviewsRepository.list = listDuplicatedReview;
    const createReviewUsecase = new CreateReviewUsecase(
      mockUsersRepository,
      mockReviewsRepository,
    );

    const createReviewParams = {
      comment: 'show',
      imageUrl: 'https://images/fotolegal.jpeg',
      movie: duplicatedMovieTitle,
      rating: 5,
      userId: 'id',
    };

    await expect(createReviewUsecase.execute(createReviewParams)).rejects.toBeInstanceOf(ConflictError)
  });
});

