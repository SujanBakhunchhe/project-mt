import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendContactEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        message: message.trim(),
      },
    })

    // Send email notification (don't fail if email fails)
    try {
      await sendContactEmail({
        name,
        email,
        phone: phone || "Not provided",
        message,
      })
    } catch (emailError) {
      console.error("Email send failed:", emailError)
      // Continue anyway since we saved to database
    }

    return NextResponse.json(
      { message: "Message sent successfully", id: contact.id },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
