import { verifyToken } from '../../lib/auth';

console.log('pages/api/protected.ts');

export async function get({ request }: { request: Request }) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const user = verifyToken(token);
    const content = `Hello, ${user.username}. This is protected content.`;
    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response('Unauthorized', { status: 401 });
  }
}
