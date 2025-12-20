import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';
import { getSession } from '@/lib/session';
import { loginRateLimit } from '@/lib/ratelimit';
import { getClientIp } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const { success } = await loginRateLimit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Set session
    const session = await getSession();
    session.userId = user.id;
    session.email = user.email;
    session.name = user.name || undefined;
    session.role = user.role;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
