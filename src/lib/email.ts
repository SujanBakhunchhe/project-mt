import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'BikeParts Nepal <onboarding@resend.dev>';

export async function sendOrderConfirmationEmail(
  to: string,
  orderData: {
    orderNumber: string;
    total: number;
    items: Array<{ name: string; quantity: number; price: number }>;
  },
  baseUrl: string = 'http://localhost:3000'
) {
  try {
    console.log('Sending order confirmation email to:', to);
    console.log('Order data:', orderData);
    
    const result = await resend.emails.send({
      from: FROM_EMAIL,
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
    console.log('Email sent successfully:', result);
    
    if (result.error) {
      console.error('Resend API error:', result.error);
      return { success: false, error: result.error };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(to: string, resetToken: string) {
  const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';
  const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`;
  
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
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
      from: FROM_EMAIL,
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


export async function sendOrderStatusEmail(
  to: string,
  customerName: string,
  orderId: string,
  status: string,
  baseUrl: string = 'http://localhost:3000'
) {
  try {
    const statusMessages: Record<string, { subject: string; message: string; color: string }> = {
      Processing: {
        subject: "Order is Being Processed",
        message: "Your order is currently being processed. We'll notify you once it's shipped.",
        color: "#f59e0b"
      },
      Shipped: {
        subject: "Order Shipped!",
        message: "Great news! Your order has been shipped and is on its way to you.",
        color: "#3b82f6"
      },
      Delivered: {
        subject: "Order Delivered",
        message: "Your order has been delivered. Thank you for shopping with us!",
        color: "#10b981"
      },
      Cancelled: {
        subject: "Order Cancelled",
        message: "Your order has been cancelled. If you have any questions, please contact us.",
        color: "#ef4444"
      }
    };

    const statusInfo = statusMessages[status] || statusMessages.Processing;

    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `${statusInfo.subject} - Order #${orderId.slice(-8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: ${statusInfo.color};">Order Status Update</h1>
          <p>Hi ${customerName},</p>
          <p>${statusInfo.message}</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Order ID:</strong> ${orderId}</p>
            <p style="margin: 10px 0 0 0;"><strong>Status:</strong> <span style="color: ${statusInfo.color};">${status}</span></p>
          </div>
          
          <p>Thank you for choosing BikeParts Nepal!</p>
          <p style="color: #6b7280; font-size: 14px;">If you have any questions, please contact us.</p>
        </div>
      `
    });

    console.log(`Status email sent to ${to} for order ${orderId}`);
  } catch (error) {
    console.error('Failed to send status email:', error);
    throw error;
  }
}
