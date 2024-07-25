import type { APIRoute } from 'astro';

export const get: APIRoute = ({ cookies }) => {
  const userRole = cookies.get('userRole')?.value || 'klient';
  return new Response(JSON.stringify({ role: userRole }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};