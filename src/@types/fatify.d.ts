declare module 'fastify' {
  import { User } from '../users/entities/user.entity'

  type FastifyRequestWithAuthGuard = import('fastify').FastifyRequest & {
    user: User
  }
}
