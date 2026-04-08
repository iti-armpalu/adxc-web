"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "@/lib/gate/token";

export async function logoutAction(): Promise<never> {
  const cookieStore = await cookies();

  // secure: true is required — __Host- prefix enforces it at the browser level
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  redirect("/gate");
}