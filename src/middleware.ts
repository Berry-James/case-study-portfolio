import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PAGE_ROUTES } from './network/pageRoutes';
import { LOGIN_COOKIE_KEY } from './static/login.static';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { headers } from 'next/headers';
 
/**
 * Restricts access to rest of system if login cookie is not present
 * Please note that there is no true 'auth' here, and the reason for using a cookie is to prevent flicker
 * and ensure that the correct content is always sent from the server ASAP
 * 
 * @param request     The NextRequest
 * @returns A redirect, or response
 */
export function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname;

    const redirect = (url: string) => {
      const base = request.nextUrl.clone();
      base.pathname = url;
      return NextResponse.redirect(base);
    }

    const { isMobile } = getSelectorsByUserAgent(headers().get('user-agent') ?? '');

    // If mobile device
    if(isMobile) {
      if(pathname.startsWith(PAGE_ROUTES.mobile)) {
        return NextResponse.next();
      } else {
        return redirect(PAGE_ROUTES.mobile)
      }
    } 
    // Not mobile device
    else {

      // if we're on a mobile page, and not on a mobile device, redirect to root
      if(pathname.startsWith(PAGE_ROUTES.mobile)) {
        return redirect(PAGE_ROUTES.root);
      }

      // If we're on the login page, delete the login cookie and continue
      if(pathname === PAGE_ROUTES.login) {
        const response = NextResponse.next();
        response.cookies.delete(LOGIN_COOKIE_KEY);
        return response;
      }

      // if we have no login cookie key, redirect to login
      if(!request.cookies.has(LOGIN_COOKIE_KEY)) {
        redirect(PAGE_ROUTES.login)
      }

      // Otherwise, check
      // switch(pathname) {

      //   // If login page, delete login cookie and carry on
      //   case PAGE_ROUTES.login: {
      //     const response = NextResponse.next();
      //     response.cookies.delete(LOGIN_COOKIE_KEY);
      //     return response;
      //   }
  
      //   // For all other pages, if no login cookie -> redirect to login page
      //   // Otherwise, carry on
      //   default: {
          
      //     // check if cookie exists
      //     if(!request.cookies.has(LOGIN_COOKIE_KEY)) {
      //       const url = request.nextUrl.clone();
      //       url.pathname = PAGE_ROUTES.login;
      //       return NextResponse.redirect(url);
      //     }
      //   }
      // }
    }

    // if(isMobile && !pathname.startsWith(PAGE_ROUTES.mobile)) {
    //   return redirect(PAGE_ROUTES.mobile);
    // } else if(!isMobile && pathname.startsWith(PAGE_ROUTES.mobile)) {
    //   console.log('### STARTS WITH MOBILE')
    //   return redirect(PAGE_ROUTES.root)
    // }


}

/**
 * Match to all all pages aside from next assets
 */
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|assets/*).*)',
}