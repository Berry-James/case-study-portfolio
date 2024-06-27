import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PAGE_ROUTES } from './network/pageRoutes';
import { LOGIN_COOKIE_KEY } from './static/login.static';
 
/**
 * Restricts access to rest of system if login cookie is not present
 * Please note that there is no true 'auth' here, and the reason for using a cookie is to prevent flicker
 * and ensure that the correct content is always sent from the server ASAP
 * 
 * @param request     The NextRequest
 * @returns A redirect, or response
 */
export function middleware(request: NextRequest) {

    switch(request.nextUrl.pathname) {

      // If login page, delete login cookie and carry on
      case PAGE_ROUTES.login: {
        const response = NextResponse.next();
        response.cookies.delete(LOGIN_COOKIE_KEY);
        return response;
      }

      // For all other pages, if no login cookie -> redirect to login page
      // Otherwise, carry on
      default: {
        
        // check if cookie exists
        if(!request.cookies.has(LOGIN_COOKIE_KEY)) {
          const url = request.nextUrl.clone();
          url.pathname = PAGE_ROUTES.login;
          return NextResponse.redirect(url);
        }
      }
    }
}

/**
 * Match to all all pages aside from next assets
 */
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}