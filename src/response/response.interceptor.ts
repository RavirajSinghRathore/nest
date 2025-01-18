import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseFormat } from '../common/dto/response.dto';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<ResponseFormat>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<ResponseFormat>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        return {
          status: response?.statusCode,
          totalResults: data?.count,
          data: data?.response,
        };
      }),
    );
  }
}
