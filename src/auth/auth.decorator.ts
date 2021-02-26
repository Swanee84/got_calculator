import { createParamDecorator, ExecutionContext, HttpException } from '@nestjs/common';
import { SECRET } from '../config';
import { verify } from 'jsonwebtoken';
import { Message } from '../common/constant';

export type RoleCheck = {
  key?: string;
  roles?: string[];
};

const Auth = createParamDecorator((data: RoleCheck, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const key = data?.key;
  const roles = data?.roles;
  // if route is protected, there is a user set in auth.middleware
  if (!!req.decodedUser) {
    // 로그인 되어 있음
    if (!roles || roles.indexOf(req.decodedUser.role) > -1) {
      // 권한이 필요없는 기능이거나, 필요한 권한을 가진 사용자
      return !!key ? req.decodedUser[key] : req.decodedUser;
    } else if (roles.indexOf(req.decodedUser.role) === -1) {
      // 로그인 되어 있으나 해당 기능에 대한 권한이 없는 사용자
      throw new HttpException({ status: 403, message: Message.DISALLOWED_USER }, 403);
    }
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = req.headers.authorization;
  if (!token) {
    throw new HttpException({ status: 403, message: Message.UNAUTHORIZED_USER }, 403);
  }
  try {
    const decoded: any = verify(token, SECRET);
    if (decoded && (!roles || roles.indexOf(decoded.role) > -1)) {
      return !!key ? decoded[key] : decoded;
    } else {
      throw new HttpException({ status: 403, message: Message.DISALLOWED_USER }, 403);
    }
  } catch (e) {
    throw new HttpException({ status: 403, message: Message.EXPIRATION_AUTHORIZED }, 403);
  }
});

export default Auth;
