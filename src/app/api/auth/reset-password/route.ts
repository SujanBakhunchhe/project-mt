import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const resetToken = await prisma.passwordReset.findUnique({
      where: { token },
    })

    console.log("Reset token lookup:", { token, found: !!resetToken, resetToken })

    if (!resetToken) {
      return NextResponse.json({ error: "Token not found" }, { status: 400 })
    }

    if (resetToken.used) {
      return NextResponse.json({ error: "Token already used" }, { status: 400 })
    }

    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    })

    await prisma.passwordReset.update({
      where: { token },
      data: { used: true },
    })

    console.log("Password reset successful for:", resetToken.email)

    return NextResponse.json({ message: "Password reset successful" })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 })
  }
}
