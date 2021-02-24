// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { LoggingModel } from './logging.schema';
// import * as mongoose from 'mongoose';
//
// mongoose
//   .connect('mongodb://swanee:Park1984#!@swanee.synology.me:27017/got_log?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     autoIndex: false,
//   })
//   .catch((err) => {
//     console.log('mongoDB connect err >>', err);
//     return null;
//   });
//
// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
//     const request = context.switchToHttp().getRequest();
//     const isAuthRequest = request.route.path === '/api/user/signIn' || request.route.path === '/api/user/tokenRefresh';
//     if (isAuthRequest) {
//       return next.handle();
//     }
//     const method = request.method;
//     const url = request.route.path;
//     const params = request.params;
//     const body = request.body;
//     const query = request.query;
//
//     const logging = new LoggingModel({ method, url, params, body, query });
//
//     const now = Date.now();
//     return next.handle().pipe(
//       tap(
//         (x) => {
//           console.log('interceptor X : ', x);
//           logging.processTime = Date.now() - now;
//           logging.status = x.status;
//           logging.success = x.success;
//           logging.message = x.message;
//           logging.save();
//         },
//         (e) => {
//           console.log('interceptor E : ', e);
//           logging.processTime = Date.now() - now;
//           logging.status = e.status ?? 500;
//           logging.success = false;
//           logging.message = e.message;
//           if (logging.status >= 500) {
//             logging.stack = e.stack;
//           }
//           logging.save();
//         },
//       ),
//     );
//   }
// }
