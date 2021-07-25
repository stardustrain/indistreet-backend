import { Injectable, NestInterceptor, NotFoundException } from '@nestjs/common'
import { tap } from 'rxjs/operators'
import { isNil } from 'ramda'

import type { ExecutionContext, CallHandler } from '@nestjs/common'

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap((data) => {
        if (isNil(data)) {
          throw new NotFoundException()
        }
      }),
    )
  }
}
