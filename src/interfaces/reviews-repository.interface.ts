import { Review } from "../models/review.model";

export interface ReviewsRepositoryInterface {
  create: (data: Review) => Promise<Review>;
  list: (query: Partial<Review>) => Promise<Review[]>;
}
