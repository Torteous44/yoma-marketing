import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Yoma Solutions Contact <noreply@yoma-solutions.com>',
      to: ['mattporteous44@gmail.com'],
      subject: `New Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">From:</h3>
            <p style="margin: 0; padding: 10px; background-color: #f9f9f9; border-radius: 4px;">
              <strong>${name}</strong><br>
              <a href="mailto:${email}" style="color: #007bff;">${email}</a>
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Message:</h3>
            <div style="padding: 15px; background-color: #f9f9f9; border-radius: 4px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
            This email was sent from Yoma Solutions contact form.
          </div>
        </div>
      `,
      text: `
New Contact from ${name}

From: ${name} (${email})

Message:
${message}

---
This email was sent from Yoma Solutions contact form.
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
