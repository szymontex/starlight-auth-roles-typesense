import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies }) => {
  console.log('Logout endpoint called');
  cookies.delete('token', { path: '/' });
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
    }
  });
};