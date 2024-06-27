'use server'
import { PAGE_ROUTES } from "@/network/pageRoutes";
import { LOGIN_COOKIE_KEY } from "@/static/login.static";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logInAction = async () => {
    cookies().set(LOGIN_COOKIE_KEY, '1');
    redirect(PAGE_ROUTES.root)
}

export const logOutAction = async () => {
    cookies().set(LOGIN_COOKIE_KEY, '0');
    redirect(PAGE_ROUTES.login)
}