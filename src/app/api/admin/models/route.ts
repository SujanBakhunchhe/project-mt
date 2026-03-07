import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const models = await prisma.bikeModel.findMany({
      include: { brand: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(models);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, brandId, image } = await req.json();
    
    const model = await prisma.bikeModel.create({
      data: { name, brandId, image }
    });

    return NextResponse.json(model, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create model" }, { status: 500 });
  }
}
