import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(categories.map(c => c.name));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    
    console.log("Creating category:", name);
    
    await prisma.category.create({
      data: { name: name.trim() }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Category creation error:", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to add category", details: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    
    // Check if any products use this category
    const productsWithCategory = await prisma.product.count({
      where: { category: name }
    });

    if (productsWithCategory > 0) {
      return NextResponse.json({ 
        error: `Cannot delete. ${productsWithCategory} product(s) use this category.` 
      }, { status: 400 });
    }
    
    await prisma.category.delete({
      where: { name }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
