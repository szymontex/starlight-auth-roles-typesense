import type { APIRoute } from 'astro';

console.log('pages/api/getUserRole.ts');

export const GET: APIRoute = ({ cookies }) => {
  const userRole = cookies.get('userRole')?.value || 'guest';
  return new Response(JSON.stringify({ role: userRole }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
