import { createParamDecorator, ExecutionContext, HttpException } from '@nestjs/common';
import { SECRET } from '../config';
import { verify } from 'jsonwebtoken';

export type RoleCheck = {
  key?: string;
  roles?: string[];
};

const Auth = createParamDecorator((data: RoleCheck, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const key = data?.key;
  const roles = data?.roles;
  // if route is protected, there is a user set in auth.middleware
  if ((!!req.decodedUser && !roles) || roles.indexOf(req.decodedUser.role) > -1) {
    return !!key ? req.decodedUser[key] : req.decodedUser;
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = req.headers.authorization;
  if (!token) {
    throw new HttpException({ status: 403, message: 'not authorized' }, 403);
  }
  try {
    const decoded: any = verify(token, SECRET);
    if (!roles || roles.indexOf(decoded.role) > -1) {
      return !!key ? decoded[key] : decoded;
    }
  } catch (e) {
    throw new HttpException({ status: 403, message: 'expiration authorized' }, 403);
  }
});

export default Auth;
