import type { MiddlewareHandler } from 'astro';
import { verifyToken } from './lib/auth';

interface Locals {
  userRole?: string;
}

console.log('middleware.ts');

export const onRequest: MiddlewareHandler = async ({ request, cookies, url, locals }, next) => {
  console.log('Middleware: Processing request for URL:', url.pathname);

  // Domyślna rola użytkownika
  let userRole = 'klient';

  // Pobierz token z ciasteczka lub nagłówka Authorization
  let token = cookies.get('token')?.value || request.headers.get('Authorization')?.split(' ')[1];
  console.log('Middleware: Token:', token);


  console.log('Middleware: All cookies:', request.headers.get('cookie'));


  if (token) {
    try {
      // Weryfikacja tokenu
      const user = verifyToken(token);
      userRole = user.role;
      console.log('Middleware: User role set to', userRole);

      // Ustawienie ciasteczka userRole
      cookies.set('userRole', userRole, {
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
      });
    } catch (error) {
      console.error('Middleware: Invalid token:', error);
      cookies.delete('token', { path: '/' });
      cookies.delete('userRole', { path: '/' });
      token = undefined;
      userRole = 'klient';
    }
  } else {
    console.log('Middleware: No token found, setting userRole to klient');
    cookies.set('userRole', 'klient', {
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
    });
  }

  console.log('Middleware: userRole cookie after processing:', cookies.get('userRole')?.value);
  console.log('Middleware: Checking access for path:', url.pathname, 'with userRole:', userRole);

  
  // Logika autoryzacji dostępu na podstawie roli użytkownika
  const accessRules = {
    '/admin': ['admin'],
    '/spolka': ['admin', 'spolka'],
    '/realizator': ['admin', 'spolka', 'realizator'],
    '/klient': ['admin', 'spolka', 'realizator', 'klient']
  };

  for (const [path, allowedRoles] of Object.entries(accessRules)) {
    if (url.pathname.startsWith(path) && !allowedRoles.includes(userRole)) {
      console.log('Middleware: Access denied for userRole:', userRole, 'to path:', url.pathname);
      return new Response(`Brak dostępu - tylko dla ${allowedRoles.join(', ')}`, { status: 403 });
    }
  }

  (locals as Locals).userRole = userRole;

  const response = await next();
  console.log('Middleware: Response status:', response.status);
  console.log('Middleware: Response headers:', Object.fromEntries(response.headers.entries()));
  return response;
};