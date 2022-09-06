import fetch from 'node-fetch'

export default async function handler(request, response) {
  const country = request.headers['x-vercel-ip-country']
  const city = request.headers['x-vercel-ip-city']
  const ip = request.headers['x-vercel-forwarded-for']

  await fetch(process.env.LINKS_SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      text: `*Country:* ${country || '-'}\n*City:* ${city || '-'}\n*IP:* ${
        ip || '-'
      }`
    }),
    headers: { 'Content-Type': 'application/json' }
  })

  return response.status(200).end()
}
