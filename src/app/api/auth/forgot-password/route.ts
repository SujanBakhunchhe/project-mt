import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import crypto from "crypto"

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

    const resetToken = await prisma.passwordReset.create({
      data: { email: user.email, token, expiresAt },
    })

    console.log("Reset token created:", { email: user.email, token })

    // Try to send email (will fail with fake API key)
    try {
      await sendPasswordResetEmail(user.email, token)
      console.log("Email sent successfully")
    } catch (emailError) {
      console.log("Email failed (expected with fake API key):", emailError)
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
