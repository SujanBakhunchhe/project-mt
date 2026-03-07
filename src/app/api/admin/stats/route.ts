import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [products, orders] = await Promise.all([
      prisma.product.count(),
      prisma.order.findMany({ select: { total: true } })
    ]);

    const revenue = orders.reduce((sum, order) => sum + order.total, 0);

    return NextResponse.json({
      products,
      orders: orders.length,
      revenue
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
