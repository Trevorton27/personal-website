import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactRateLimit } from '@/lib/ratelimit';
import { getClientIp } from '@/lib/utils';
import { z } from 'zod';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const inquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional().default(''),
  serviceInterest: z.enum(['website', 'ai', 'support', 'education', 'consulting', 'other']),
  message: z.string().min(10).max(5000),
  preferredLanguage: z.enum(['en', 'ja']).default('en'),
});

const serviceLabels: Record<string, string> = {
  website: 'Website Development',
  ai: 'AI Integration',
  support: 'Technical Support',
  education: 'Programming Education',
  consulting: 'General Consulting',
  other: 'Other',
};

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const { success } = await contactRateLimit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    const result = inquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, serviceInterest, message, preferredLanguage } = result.data;

    await getResend().emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `Services Inquiry: ${serviceLabels[serviceInterest]} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nService: ${serviceLabels[serviceInterest]}\nPreferred Language: ${preferredLanguage.toUpperCase()}\n\nMessage:\n${message}`,
      html: `
        <h2>New Services Inquiry</h2>
        <table style="border-collapse: collapse; margin-bottom: 16px;">
          <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">From:</td><td>${name} (${email})</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Company:</td><td>${company || 'N/A'}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Service:</td><td>${serviceLabels[serviceInterest]}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Language:</td><td>${preferredLanguage.toUpperCase()}</td></tr>
        </table>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Services inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
