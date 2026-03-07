import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'BikeParts Nepal <onboarding@resend.dev>';

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } })

    // Always return success (don't reveal if email exists)
    if (!user) {
      console.log("User not found:", email)
      return NextResponse.json({ message: "If email exists, reset link sent" })
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour

    await prisma.passwordReset.create({
      data: { email: user.email, token, expiresAt },
    })

    // Get dynamic URL from request
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const resetUrl = `${protocol}://${host}/auth/reset-password?token=${token}`;

    console.log("Reset URL:", resetUrl)

    // Try to send email
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: user.email,
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
            
            <p style="color: #6b7280; font-size: 14px;">
              This link will expire in 1 hour.
            </p>
          </div>
        `
      });
      console.log("Email sent successfully")
    } catch (emailError) {
      console.log("Email failed:", emailError)
    }

    return NextResponse.json({ 
      message: "If email exists, reset link sent",
      // DEV ONLY - remove in production
      devToken: process.env.NODE_ENV !== "production" ? token : undefined
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
