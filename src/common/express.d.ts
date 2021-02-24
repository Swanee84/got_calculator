import { IUser } from '../entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      decodedUser?: IUser;
    }
  }
}
