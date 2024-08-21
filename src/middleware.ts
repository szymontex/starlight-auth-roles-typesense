import type { MiddlewareHandler } from 'astro';
import { verifyToken } from './lib/auth';

console.log('middleware.ts');

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { cookies, url, request } = context;
  
  console.log('Middleware: Processing request for URL:', url.pathname);

  // Domyślna rola użytkownika
  let userRole = 'klient';

  // Pobierz token z ciasteczka
  const token = cookies.get("token")?.value;

  if (token) {
    console.log('Middleware: Token found:', token);
    try {
      // Weryfikacja tokenu
      const user = verifyToken(token);
      userRole = user.role; // Ustawienie roli użytkownika na podstawie tokenu

      // Ustawienie ciasteczka userRole
      context.cookies.set('userRole', user.role, {
        path: '/', 
        httpOnly: false, 
        secure: false, 
        sameSite: 'lax', // Zmieniono na 'lax' dla lepszej kompatybilności
      });
      console.log('Middleware: User role set to', user.role);

    } catch (error) {
      // Obsługa błędów weryfikacji tokenu
      console.error('Middleware: Invalid token:', error);
      context.cookies.delete('token', { path: '/' });
      context.cookies.delete('userRole', { path: '/' });
    }
  } else {
    console.log('Middleware: No token found, setting userRole to klient');

    // Ustawienie roli na 'klient', jeśli brak tokenu
    context.cookies.set('userRole', 'klient', {
      path: '/', 
      httpOnly: false, 
      secure: false, 
      sameSite: 'lax', 
    });
  }

  console.log('Middleware: userRole cookie after processing:', context.cookies.get('userRole')?.value);

  // Logowanie przed sprawdzeniem dostępu
  console.log('Middleware: Checking access for path:', url.pathname, 'with userRole:', userRole);

  // Logika autoryzacji dostępu na podstawie roli użytkownika
  if (url.pathname.startsWith('/admin') && userRole !== 'admin') {
    console.log('Middleware: Access denied for userRole:', userRole, 'to path:', url.pathname);
    return new Response('Brak dostępu - tylko dla Admina', { status: 403 });
  }

  if (url.pathname.startsWith('/spolka') && (userRole !== 'admin' && userRole !== 'spolka')) {
    console.log('Middleware: Access denied for userRole:', userRole, 'to path:', url.pathname);
    return new Response('Brak dostępu - tylko dla Admina i Spółki', { status: 403 });
  }

  if (url.pathname.startsWith('/realizator') && (userRole !== 'admin' && userRole !== 'spolka' && userRole !== 'realizator')) {
    console.log('Middleware: Access denied for userRole:', userRole, 'to path:', url.pathname);
    return new Response('Brak dostępu - tylko dla Admina, Spółki i Realizatora', { status: 403 });
  }

  if (url.pathname.startsWith('/klient') && userRole !== 'admin' && userRole !== 'spolka' && userRole !== 'realizator' && userRole !== 'klient') {
    console.log('Middleware: Access denied for userRole:', userRole, 'to path:', url.pathname);
    return new Response('Brak dostępu - tylko dla Klienta', { status: 403 });
  }

  const response = await next();
  
  console.log('Middleware: Response status:', response.status);

  return response;
};
