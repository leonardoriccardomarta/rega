import { timingSafeEqual as cryptoTimingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "regantini_admin_auth";

export function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD ?? "alberto").trim();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const value = jar.get(ADMIN_COOKIE)?.value?.trim() ?? "";
  const expected = getAdminPassword();
  if (!value || !expected) return false;
  return timingSafeEqual(value, expected);
}

export function timingSafeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return cryptoTimingSafeEqual(left, right);
}
