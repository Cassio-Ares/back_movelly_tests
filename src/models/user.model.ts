import { randomBytes } from 'crypto';

export class User {
  id: string;

  username: string;

  password: string;

  constructor(data: Omit<User, 'id'>) {
    const id = randomBytes(16).toString('hex');
    Object.assign(this, { id: id, ...data });
  }
}