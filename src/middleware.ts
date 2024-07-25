import type { MiddlewareResponseHandler } from 'astro';
import { verifyToken } from './lib/auth';

export const onRequest: MiddlewareResponseHandler = async (context, next) => {
  const { cookies, url } = context;
  
  console.log('Middleware: Processing request for URL:', url.pathname);
  
  const token = cookies.get("token")?.value;

  if (token) {
    try {
      const user = verifyToken(token);
      context.locals.user = user;
      context.cookies.set('userRole', user.role, {
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      console.log('Middleware: User role set to', user.role);
    } catch (error) {
      console.error('Middleware: Invalid token:', error);
      context.cookies.delete('token', { path: '/' });
      context.cookies.delete('userRole', { path: '/' });
      context.locals.user = null;
    }
  } else {
    console.log('Middleware: No token found');
    context.locals.user = null;
    context.cookies.set('userRole', 'klient', {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
  }

  console.log('Middleware: context.locals:', JSON.stringify(context.locals));
  console.log('Middleware: userRole cookie:', context.cookies.get('userRole')?.value);

  const response = await next();
  
  console.log('Middleware: Response status:', response.status);

  return response;
};