import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Build the URL from the request to ensure it works in all environments
  const url = new URL('/resume.pdf', request.url);

  return NextResponse.redirect(url, {
    status: 302,
  });
}
