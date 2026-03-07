import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();
    
    // Auto-create category if it doesn't exist
    if (data.category) {
      await prisma.category.upsert({
        where: { name: data.category },
        update: {},
        create: { name: data.category }
      });
    }
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        marketPrice: data.marketPrice,
        category: data.category,
        brand: data.brand || "Universal",
        bikeModelId: data.bikeModelId || null,
        stock: data.stock,
        images: data.images || [],
        features: data.features || [],
        specifications: data.specifications || {},
        featured: data.featured || false,
        upcoming: data.upcoming || false,
        releaseDate: data.releaseDate || null
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
