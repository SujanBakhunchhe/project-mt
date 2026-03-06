import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email, phone, address, currentPassword, newPassword } = await req.json()

    // Validation
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    if (name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if email is taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        NOT: { id: session.user.id }
      }
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    // If changing password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password required" }, { status: 400 })
      }

      if (newPassword.length < 8) {
        return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 })
      }

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
        return NextResponse.json({ error: "Password must contain uppercase, lowercase, and number" }, { status: 400 })
      }

      // Verify current password
      const user = await prisma.user.findUnique({
        where: { id: session.user.id }
      })

      if (!user?.password) {
        return NextResponse.json({ error: "Cannot change password for OAuth users" }, { status: 400 })
      }

      const isValid = await bcrypt.compare(currentPassword, user.password)
      if (!isValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
      }

      // Update with new password
      const hashedPassword = await bcrypt.hash(newPassword, 12)
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone: phone?.trim() || null,
          address: address?.trim() || null,
          password: hashedPassword
        }
      })
    } else {
      // Update without password change
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone: phone?.trim() || null,
          address: address?.trim() || null,
        }
      })
    }

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
