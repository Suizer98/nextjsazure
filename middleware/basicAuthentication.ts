// middleware/basicAuthentication.ts
import { NextRequest, NextResponse } from 'next/server';

export function basicAuthentication(req: NextRequest) {
  const { USER, PW } = process.env; // Using environment variables
  const authorization = req.headers.get('authorization');

  if (!authorization) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const [username, password] = Buffer.from(authorization.split(' ')[1], 'base64').toString().split(':');

  if (username === USER && password === PW) {
    return NextResponse.next();
  }

  return new Response('Access Denied', {
    status: 403,
  });
}
