import { FastifyRequest } from 'fastify'
import type { ValidatedUser } from '../users/strategies/local.strategy'

declare module 'fastify' {
  type FastifyRequestWithAuthGuard = FastifyRequest & {
    user: ValidatedUser
  }
}
