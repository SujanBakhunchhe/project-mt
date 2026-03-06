import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// DEV ONLY - Remove in production
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const email = searchParams.get("email")

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 })
  }

  const resetToken = await prisma.passwordReset.findFirst({
    where: { 
      email: email.toLowerCase().trim(),
      used: false,
      expiresAt: { gt: new Date() }
    },
    orderBy: { createdAt: "desc" }
  })

  if (!resetToken) {
    return NextResponse.json({ error: "No active reset token found" }, { status: 404 })
  }

  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken.token}`

  return NextResponse.json({ 
    token: resetToken.token,
    resetUrl,
    expiresAt: resetToken.expiresAt 
  })
}
