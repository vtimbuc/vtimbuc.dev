import fetch from 'node-fetch'

export default async function handler(request, response) {
  console.log({ a: request.headers })

  await fetch(process.env.LINKS_SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      text: 'Test'
    }),
    headers: { 'Content-Type': 'application/json' }
  })

  return response.status(200)
}
