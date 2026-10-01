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
    productData,
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
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${type}\n${metal ? `Metal: ${metal}\n` : ''}${categories?.length ? `Categories: ${categories.join(', ')}\n` : ''}${productData ? `\nProduct Inquired: ${productData.name} (ID: ${productData.id})` : ''}\n\nMessage:\n${message || 'No message provided'}`,
  };

  let productHtml = '';
  if (type === 'product' && productData) {
    let imageUrl = '';
    if (productData.images && productData.images.length > 0) {
      imageUrl = productData.images[0].imageUrl;
      if (imageUrl && imageUrl.startsWith('/')) {
        imageUrl = (process.env.API_URL || 'https://parvati-jewels.vercel.app') + imageUrl;
      }
    }
    
    let price = 'Price upon request';
    let productMetal = metal;
    if (productData.variants && productData.variants.length > 0) {
      price = '$' + productData.variants[0].price.toFixed(2);
      if (!productMetal) {
        productMetal = productData.variants[0].metal;
      }
    }
    
    const categoryName = productData.category ? productData.category.name : '';
    const rating = productData.rating || 4;
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += `<span style="color: ${i <= rating ? '#0C758C' : '#cccccc'}; font-size: 24px; margin-right: 2px;">★</span>`;
    }

    productHtml = `
      <div style="margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 30px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="width: 200px; vertical-align: top; padding-right: 20px;">
              ${imageUrl ? `<img src="${imageUrl}" alt="${productData.name}" style="width: 100%; max-width: 200px; height: auto; object-fit: cover; border-radius: 4px;" />` : `<div style="width: 200px; height: 200px; background-color: #f0f0f0; border-radius: 4px;"></div>`}
            </td>
            <td style="vertical-align: top;">
              <h3 style="margin: 0 0 15px 0; color: #0C758C; font-size: 24px; font-weight: normal;">${productData.name}</h3>
              <div style="font-weight: bold; font-size: 18px; color: #1a1a1a; margin-bottom: 20px;">${price}</div>
              
              <div style="margin-bottom: 12px; font-size: 15px;">
                <span style="color: #3d3d3d;">Metal</span> <span style="color: #999999; margin-left: 8px;">${productMetal || 'N/A'}</span>
              </div>
              <div style="margin-bottom: 20px; font-size: 15px;">
                <span style="color: #3d3d3d;">Product Category</span> <span style="color: #999999; margin-left: 8px;">${categoryName}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                ${starsHtml}
              </div>
            </td>
          </tr>
        </table>
        
        <div style="margin-top: 25px; color: #666666; line-height: 1.6; font-size: 15px;">
          ${(productData.description || productData.shortDescription || '').replace(/\n/g, '<br/>')}
        </div>
      </div>
    `;
  }

  adminMail.html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #0C758C; color: #ffffff; padding: 20px;">
          <h2 style="margin: 0; font-size: 24px;">${type === 'product' ? 'Product Inquiry' : 'General Inquiry'}</h2>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; width: 35%; font-weight: bold; color: #1a1a1a;">Name:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #3d3d3d;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a1a1a;">Email:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #3d3d3d;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a1a1a;">Mobile no.:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #3d3d3d;">${phone}</td>
            </tr>
            ${metal && type !== 'product' ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a1a1a;">Metal:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #3d3d3d;">${metal}</td>
            </tr>
            ` : ''}
            ${categories && categories.length > 0 ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a1a1a;">Categories:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #3d3d3d;">${categories.join(', ')}</td>
            </tr>
            ` : ''}
          </table>
          
          ${type !== 'product' ? `
          <div style="margin-top: 25px;">
            <p style="font-weight: bold; color: #1a1a1a; margin-bottom: 10px;">Message:</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; color: #3d3d3d; min-height: 80px; white-space: pre-wrap;">
              ${message || 'No message provided'}
            </div>
          </div>
          ` : ''}

          ${productHtml}
        </div>
      </div>
  `;

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
