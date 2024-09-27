import type { MiddlewareHandler } from 'astro';
import { verifyToken } from './lib/auth';

interface Locals {
  userRole?: string;
}

export const onRequest: MiddlewareHandler = async ({ request, cookies, url, locals }, next) => {
  console.log('Middleware: Processing request for URL:', url.pathname);

  // Default user role
  let userRole = 'guest';

  // Retrieve token from cookies or Authorization header
  let token = cookies.get('token')?.value || request.headers.get('Authorization')?.split(' ')[1];
  console.log('Middleware: Token:', token);

  if (token) {
    try {
      // Verify token
      const user = verifyToken(token);
      userRole = user.role;
      console.log('Middleware: User role set to', userRole);

      // Set userRole cookie
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
      userRole = 'guest';
    }
  } else {
    console.log('Middleware: No token found, setting userRole to guest');
    cookies.set('userRole', 'guest', {
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
    });
  }

  console.log('Middleware: userRole cookie after processing:', cookies.get('userRole')?.value);
  console.log('Middleware: Checking access for path:', url.pathname, 'with userRole:', userRole);

  // Access control logic based on user role
  const accessRules = {
    '/admin': ['admin'],
    '/company': ['admin', 'companyMember'],
    '/editor': ['admin', 'companyMember', 'editor'],
    '/guest': ['admin', 'companyMember', 'editor', 'guest']
  };

  for (const [path, allowedRoles] of Object.entries(accessRules)) {
    if (url.pathname.startsWith(path) && !allowedRoles.includes(userRole)) {
      console.log('Middleware: Access denied for userRole:', userRole, 'to path:', url.pathname);
      return new Response(`Access denied - only for ${allowedRoles.join(', ')}`, { status: 403 });
    }
  }

  (locals as Locals).userRole = userRole;

  const response = await next();
  console.log('Middleware: Response status:', response.status);
  console.log('Middleware: Response headers:', Object.fromEntries(response.headers.entries()));
  return response;
};
