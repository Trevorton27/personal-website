import { cookies, headers } from 'next/headers';
import Tokens from 'csrf';

const tokens = new Tokens();

export async function generateCsrfToken(): Promise<string> {
  const secret = process.env.SESSION_SECRET!;
  return tokens.create(secret);
}

export async function verifyCsrfToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.SESSION_SECRET!;
    return tokens.verify(secret, token);
  } catch {
    return false;
  }
}

export async function getCsrfToken(): Promise<string> {
  const cookieStore = await cookies();
  let token = cookieStore.get('csrf_token')?.value;

  if (!token) {
    token = await generateCsrfToken();
  }

  return token;
}

export async function setCsrfTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function validateCsrfFromHeader(): Promise<boolean> {
  const headersList = await headers();
  const token = headersList.get('x-csrf-token');

  if (!token) {
    return false;
  }

  return verifyCsrfToken(token);
}
