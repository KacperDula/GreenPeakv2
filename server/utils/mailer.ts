import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Array<{
    filename: string;
    path: string;
  }>;
}

export function isEmailConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
}

export function createTransporter() {
  if (!isEmailConfigured()) {
    return null;
  }

  const config: EmailConfig = {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!, 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  };

  return nodemailer.createTransport(config);
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  const transporter = createTransporter();

  if (!transporter) {
    return {
      success: false,
      error: 'SMTP not configured',
    };
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      ...options,
    });

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export function formatInquiryEmail(data: any): { text: string; html: string } {
  const text = `
New Website Inquiry

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Website: ${data.website || 'Not provided'}

Project Type: ${data.projectType}
Budget Range: ${data.budget}
Timeline: ${data.timeline}

Message:
${data.message}

---
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' })}
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #1F2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0F7B3E; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #F3F4F6; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #0F7B3E; }
    .value { margin-top: 5px; }
    .message-box { background: white; padding: 15px; border-radius: 4px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Website Inquiry</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value">${data.phone || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Company:</div>
        <div class="value">${data.company || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Website:</div>
        <div class="value">${data.website ? `<a href="${data.website}">${data.website}</a>` : 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Project Type:</div>
        <div class="value">${data.projectType}</div>
      </div>
      <div class="field">
        <div class="label">Budget Range:</div>
        <div class="value">${data.budget}</div>
      </div>
      <div class="field">
        <div class="label">Timeline:</div>
        <div class="value">${data.timeline}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
      <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
        Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' })}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { text, html };
}
