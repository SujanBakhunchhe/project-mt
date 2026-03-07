import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const brand = searchParams.get("brand")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")
    const upcoming = searchParams.get("upcoming")
    const bikeModelId = searchParams.get("bikeModelId")

    const where: any = {}

    if (brand) where.brand = brand
    if (category) where.category = category
    if (featured === "true") where.featured = true
    if (upcoming === "true") where.upcoming = true
    if (bikeModelId) where.bikeModelId = bikeModelId
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        bikeModel: {
          include: {
            brand: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
      take: (featured === "true" || upcoming === "true") ? 4 : undefined
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Products fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
