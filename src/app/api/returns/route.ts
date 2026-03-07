import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { orderNumber, email, phone, productName, reason, description } = await req.json();

    // Validate required fields
    if (!orderNumber || !email || !phone || !productName || !reason || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create return request
    const returnRequest = await prisma.returnRequest.create({
      data: {
        orderNumber,
        email,
        phone,
        productName,
        reason,
        description,
        status: "pending"
      }
    });

    // TODO: Send email notification to admin

    return NextResponse.json({ success: true, id: returnRequest.id });
  } catch (error) {
    console.error("Return request error:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}

// Get all return requests (admin only)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where = status ? { status } : {};

    const requests = await prisma.returnRequest.findMany({
      where,
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Fetch returns error:", error);
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}
