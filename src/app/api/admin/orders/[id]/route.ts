import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendOrderStatusEmail } from "@/lib/email";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await req.json();

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Send email notification
    try {
      const host = req.headers.get('host') || 'localhost:3000';
      const protocol = host.includes('localhost') ? 'http' : 'https';
      const baseUrl = `${protocol}://${host}`;
      
      await sendOrderStatusEmail(order.user.email, order.user.name || "Customer", order.id, status, baseUrl);
    } catch (emailError) {
      console.error("Failed to send status email:", emailError);
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
