import type { APIRoute } from 'astro';
import { generateToken } from '../../../lib/auth';
import passport from 'passport';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { username, password } = await request.json();
  console.log('Received login request:', { username, password });

  return new Promise((resolve) => {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        console.error('Authentication failed:', err || info?.message);
        resolve(new Response('Invalid credentials', { status: 401 }));
      } else {
        const token = generateToken(user);
        console.log('User authenticated successfully:', user);
        
        cookies.set('token', token, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 60 * 60 // 1 hour
        });

        resolve(new Response(JSON.stringify({ token, role: user.uprawnienia }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }));
      }
    })({ body: { username, password } });
  });
};