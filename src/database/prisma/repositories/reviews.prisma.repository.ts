import { ReviewsRepositoryInterface } from "../../../interfaces/reviews-repository.interface";
import { Review } from "../../../models/review.model";
import { PrismaService } from "../prisma.service";

export class ReviewsPrismaRepository implements ReviewsRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(data: Review): Promise<Review> {
    return this.prisma.reviews.create({
      data: {
        id: data.id,
        comment: data.comment,
        imageUrl: data.imageUrl,
        movie: data.movie,
        rating: data.rating,
        userId: data.userId,
      }
     });
  }

  async list(query: Partial<Review> = {}): Promise<Review[]> {
    return this.prisma.reviews.findMany({
      where: {
        ...query,
      },
      include: {
        User: true,
      }
    });
  }
}
