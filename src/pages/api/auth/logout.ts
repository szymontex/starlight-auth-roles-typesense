import type { APIRoute } from 'astro';

console.log('pages/api/auth/logout.ts');

export const POST: APIRoute = async ({ cookies }) => {
  console.log('pages/api/auth/logout.ts Logout endpoint called');
  cookies.delete('token', { path: '/' });
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
    }
  });
};