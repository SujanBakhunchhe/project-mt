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
      prisma.order.findMany({ 
        select: { total: true, createdAt: true },
        orderBy: { createdAt: 'desc' }
      })
    ]);

    const revenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Calculate weekly stats (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyOrders = orders.filter(o => new Date(o.createdAt) >= weekAgo);
    const weeklyRevenue = weeklyOrders.reduce((sum, order) => sum + order.total, 0);

    // Calculate monthly stats (last 30 days)
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const monthlyOrders = orders.filter(o => new Date(o.createdAt) >= monthAgo);
    const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.total, 0);

    // Last 7 days chart data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dayOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate.toDateString() === date.toDateString();
      });
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, o) => sum + o.total, 0)
      };
    });

    return NextResponse.json({
      products,
      orders: orders.length,
      revenue,
      weeklyOrders: weeklyOrders.length,
      weeklyRevenue,
      monthlyOrders: monthlyOrders.length,
      monthlyRevenue,
      chartData: last7Days
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
