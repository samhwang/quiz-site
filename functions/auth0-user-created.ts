import { onUserCreated, OnUserCreatedPayload } from 'quiz-backend/src/events';

type Env = {
  DATABASE_URL: string
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'POST') return new Response('')

  const body: OnUserCreatedPayload = await request.json()
  const payload = await onUserCreated(body, env)
  console.log(payload)

  return new Response('ok')
}

// fetch('https://bidding-brought-us-excerpt.trycloudflare.com/auth0-user-created', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     email: 'beatyshot@gmai.com'
//   })
// })
// .then(console.log)
