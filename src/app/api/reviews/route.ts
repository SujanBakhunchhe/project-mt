import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId, rating, comment } = await req.json()

    if (!productId || !rating) {
      return NextResponse.json({ error: "Product ID and rating required" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: session.user.id,
        rating,
        comment: comment || "",
      },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error("Review creation error:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Reviews fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}
