import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');

export async function sendOrderConfirmationEmail(
  to: string,
  orderData: {
    orderNumber: string;
    total: number;
    items: Array<{ name: string; quantity: number; price: number }>;
  }
) {
  try {
    await resend.emails.send({
      from: 'BikeParts Nepal <onboarding@resend.dev>',
      to,
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Order Confirmed!</h1>
          <p>Thank you for your order. Your order number is <strong>${orderData.orderNumber}</strong></p>
          
          <h2>Order Summary</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 10px; text-align: left;">Item</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${orderData.items.map(item => `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px;">${item.name}</td>
                  <td style="padding: 10px; text-align: center;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right;">NPR ${item.price * item.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
            <p style="margin: 0; font-size: 18px; font-weight: bold;">Total: NPR ${orderData.total}</p>
          </div>
          
          <p style="margin-top: 30px;">We'll send you another email when your order ships.</p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
            BikeParts Nepal<br>
            Kathmandu, Nepal
          </p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(to: string, resetToken: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
  
  try {
    await resend.emails.send({
      from: 'BikeParts Nepal <onboarding@resend.dev>',
      to,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Reset Your Password</h1>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          
          <a href="${resetUrl}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px;">
            Reset Password
          </a>
          
          <p style="color: #6b7280; font-size: 14px;">
            If you didn't request this, you can safely ignore this email.
          </p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
            BikeParts Nepal<br>
            Kathmandu, Nepal
          </p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: 'BikeParts Nepal <onboarding@resend.dev>',
      to: 'support@bikepartsnepal.com', // Your business email
      replyTo: data.email,
      subject: `New Contact Form Message from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">New Contact Form Submission</h1>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h2 style="color: #374151;">Message:</h2>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
            This message was sent from the BikeParts Nepal contact form.
          </p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}
