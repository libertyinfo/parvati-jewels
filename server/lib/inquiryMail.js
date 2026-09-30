const nodemailer = require('nodemailer');

const DEFAULT_ADMIN_TO = 'dhvani.lis21@gmail.com';

function smtpHost() {
  if (process.env.SMTP_HOST) return process.env.SMTP_HOST;
  const user = process.env.SMTP_USER || '';
  if (user.includes('@gmail.') || user.includes('@googlemail.')) {
    return 'smtp.gmail.com';
  }
  return null;
}

function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      smtpHost(),
  );
}

function createTransporter() {
  if (!isSmtpConfigured()) return null;

  const port = Number(process.env.SMTP_PORT) || 587;
  const host = smtpHost();

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    ...(port === 587 ? { requireTLS: true } : {}),
  });
}

function mailFromAddress() {
  if (process.env.SMTP_FROM) return process.env.SMTP_FROM;
  const user = process.env.SMTP_USER;
  if (user) return `"Parvati Jewels" <${user}>`;
  return '"Parvati Jewels" <noreply@parvatijewels.com>';
}

function adminInbox() {
  return process.env.INQUIRY_ADMIN_EMAIL || DEFAULT_ADMIN_TO;
}

async function verifySmtpOnStartup() {
  if (!isSmtpConfigured()) {
    console.warn(
      '[mail] Inquiry emails disabled. On your API host (e.g. Render), set SMTP_HOST, SMTP_USER, SMTP_PASS (and INQUIRY_ADMIN_EMAIL if needed).',
    );
    return;
  }

  const transporter = createTransporter();
  try {
    await transporter.verify();
    console.log(`[mail] SMTP ready (${smtpHost()}) → admin: ${adminInbox()}`);
  } catch (err) {
    console.error('[mail] SMTP verify failed:', err.message);
  }
}

/**
 * @returns {{ sent: boolean, error?: string }}
 */
async function sendInquiryEmails(payload) {
  const {
    type,
    name,
    email,
    phone,
    metal,
    categories,
    message,
    productDetails,
  } = payload;

  if (!isSmtpConfigured()) {
    console.log('[mail] Simulation (no SMTP env on API server)');
    console.log('[mail] Would notify admin at', adminInbox(), 'for', email);
    return {
      sent: false,
      error: 'SMTP is not configured on the API server',
    };
  }

  const transporter = createTransporter();
  const from = mailFromAddress();

  const adminMail = {
    from,
    to: adminInbox(),
    replyTo: email,
    subject: `New ${type === 'product' ? 'Product' : 'General'} Inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${type}\n${metal ? `Metal: ${metal}\n` : ''}${categories?.length ? `Categories: ${categories.join(', ')}\n` : ''}${productDetails}\n\nMessage:\n${message || 'No message provided'}`,
  };

  if (type !== 'product') {
    adminMail.html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #0C758C; color: #ffffff; padding: 20px;">
            <h2 style="margin: 0; font-size: 24px;">General Inquiry</h2>
          </div>
          <div style="padding: 20px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; width: 30%; font-weight: bold; color: #1a1a1a;">Name:</td>
                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; color: #3d3d3d;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a1a1a;">Email:</td>
                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; color: #3d3d3d;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a1a1a;">Mobile no.:</td>
                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; color: #3d3d3d;">${phone}</td>
              </tr>
              ${metal ? `
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a1a1a;">Metal:</td>
                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; color: #3d3d3d;">${metal}</td>
              </tr>
              ` : ''}
              ${categories && categories.length > 0 ? `
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a1a1a;">Categories:</td>
                <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; color: #3d3d3d;">${categories.join(', ')}</td>
              </tr>
              ` : ''}
            </table>
            
            <div style="margin-top: 20px;">
              <p style="font-weight: bold; color: #1a1a1a; margin-bottom: 10px;">Message:</p>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; color: #3d3d3d; min-height: 80px;">
                ${message || 'No message provided'}
              </div>
            </div>
          </div>
        </div>
      `;
  }

  const customerMail = {
    from,
    to: email,
    subject: `Thank you for your Inquiry - Parvati Jewels`,
    text: `Dear ${name},\n\nYour inquiry has been submitted successfully. Thank you for reaching out to us. We will get back to you shortly!\n\nBest Regards,\nParvati Jewels`,
  };

  try {
    await transporter.sendMail(adminMail);
    await transporter.sendMail(customerMail);
    return { sent: true };
  } catch (err) {
    console.error('[mail] send failed:', err);
    return {
      sent: false,
      error: err.message || 'Failed to send email',
    };
  }
}

module.exports = {
  adminInbox,
  isSmtpConfigured,
  verifySmtpOnStartup,
  sendInquiryEmails,
};
