'use server'
import { PAGE_ROUTES } from "@/network/pageRoutes";
import { LOGIN_COOKIE_KEY } from "@/static/login.static";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Mock login server action
 * Creates a login cookie key and redirects to root page
 */
export const logInAction = async () => {
    cookies().set(LOGIN_COOKIE_KEY, '1');
    redirect(PAGE_ROUTES.root)
}

/**
 * Mock logout server action
 * Remotes login cookie key and redirects to login page
 */
export const logOutAction = async () => {
    cookies().set(LOGIN_COOKIE_KEY, '0');
    redirect(PAGE_ROUTES.login)
}