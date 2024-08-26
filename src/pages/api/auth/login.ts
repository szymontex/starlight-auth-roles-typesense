import type { APIRoute } from 'astro';
import { generateToken } from '../../../lib/auth';
import passport from 'passport';

console.log('pages/api/auth/login.ts');

export const POST: APIRoute = async ({ request, cookies }) => {
  const { username, password } = await request.json();
  console.log('pages/api/auth/login.ts Received login request:', { username, password });

  return new Promise((resolve) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err || !user) {
        console.error('pages/api/auth/login.ts Authentication failed:', err || info?.message);
        resolve(new Response('Invalid credentials', { status: 401 }));
      } else {
        const token = generateToken(user);
        console.log('pages/api/auth/login.ts User authenticated successfully:', user);
        console.log('pages/api/auth/login.ts Generated token:', token);
        
        cookies.set('token', token, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 60 // 1 hour
        });
        
        console.log('pages/api/auth/login.ts Cookie set:', cookies.get('token'));

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