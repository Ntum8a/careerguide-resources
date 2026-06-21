import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, tags } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const datacenter = apiKey.split('-')[1]
  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`

  const body: Record<string, unknown> = {
    email_address: email,
    status: 'subscribed',
  }

  if (firstName || lastName) {
    body.merge_fields = {
      ...(firstName && { FNAME: firstName }),
      ...(lastName && { LNAME: lastName }),
    }
  }

  if (tags && Array.isArray(tags)) {
    body.tags = tags
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
    },
    body: JSON.stringify(body),
  })

  if (res.status === 400) {
    const data = await res.json()
    if (data.title === 'Member Exists') {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
    }
    return NextResponse.json({ error: data.detail || 'Subscription failed' }, { status: 400 })
  }

  if (!res.ok) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 })
}
