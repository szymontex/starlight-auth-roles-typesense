// src/pages/api/auth/me.ts
import type { APIRoute } from 'astro';
import { verifyToken } from '../../../lib/auth';

console.log('pages/api/auth/me.ts');

export const GET: APIRoute = async ({ request }) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response('No token provided', { status: 401 });
  }

  try {
    const user = verifyToken(token);
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response('Invalid token', { status: 401 });
  }
};