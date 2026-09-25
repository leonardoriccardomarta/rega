import { cookies } from "next/headers";

export const ADMIN_COOKIE = "regantini_admin_auth";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "alberto";
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === getAdminPassword();
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}
