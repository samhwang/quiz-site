import { PrismaClient } from '@prisma/client/edge'

export type OnUserCreatedPayload = {
  user_id: string
  email: string
  name: string
  avatar: string
}

export const onUserCreated = async (payload: OnUserCreatedPayload, env: { DATABASE_URL: string }) => {
  console.log('here')
  console.log(env)

  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: env.DATABASE_URL
        }
      }
    })

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email
      }
    })
    if (!user) return { name: 'USER_EXISTED', email: payload.email }
  
    const newUser = await prisma.user.create({
      data: {
        externalId: payload.user_id,
        email: payload.email,
        name: payload.name,
        avatar: payload.avatar,
      }
    })
    return { name: 'USER_CREATED', user: newUser }
  }
  catch(error) {
    return { name: 'INTERNAL_ERROR', error }
  }
}
