import { Review } from "../models/review.model";
import { User } from "../models/user.model";

export interface DBConnection {
  isConnected: boolean;
  users: {
    create: (user: User) => Promise<void>;
    findOne: (username: string) => Promise<User | undefined>;
    findById: (id: string) => Promise<User | undefined>;
    list: () => Promise<User[]>;
  };
  reviews: {
    create: (review: Review) => Promise<void>;
    list: (query: Partial<Pick<Review, 'userId'>>) => Promise<Review[]>;
  };
}

class Database {
  // Simulate a database
  private users: User[] = [];
  private reviews: Review[] = [];
  // Simulate a database index for faster lookups
  private usersById: Map<string, User> = new Map();
  private usersByUsername: Map<string, User> = new Map();

  // Simulate a database connection
  public async connect(): Promise<void> {
    console.info('database connection established ✅');
    return Promise.resolve();
  }

  public getConnection(): DBConnection {
    return {
      isConnected: true,
      users: {
        create: async (user: User) => {
          this.users.push(user);
          this.usersById.set(user.id, user);
          this.usersByUsername.set(user.username, user);
        },
        findOne: async (username: string) => {
          return this.usersByUsername.get(username);
        },
        findById: async (id: string) => {
          return this.usersById.get(id);
        },
        list: async () => {
          return this.users;
        }
      },
      reviews: {
        create: async (review: Review) => {
          this.reviews.push(review);
        },
        list: async (query: Partial<Pick<Review, 'userId'>> = {}) => {
          if (query?.userId) {
            return this.reviews.filter(
              review => review.userId === query.userId
            ).map(review => ({
              ...review,
              user: this.usersById.get(review.userId),
            }))
          }

          return this.reviews.map(review => ({
            ...review,
            user: this.usersById.get(review.userId),
          }));
        }
      }
    };
  }
}

export const database = new Database();
