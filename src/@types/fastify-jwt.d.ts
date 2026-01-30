import '@fastify/jwt'
import 'fastify'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string,
      role: 'ADMIN' | 'MEMBER'
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      sub: string
    }
  }
}
