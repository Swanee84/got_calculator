import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../config';
import { IUser } from '../entities/user.entity';
import { Constant } from '../common/constant';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = (req.headers[Constant.HEADER_KEY] || req.query[Constant.HEADER_KEY]) as string;
    try {
      const decoded: any = verify(token, SECRET);
      const user: IUser = { ...decoded }; // await this.authService.findById(decoded.id)

      if (user) {
        req.decodedUser = user;
      }
    } catch (e) {}
    next();
  }
}
