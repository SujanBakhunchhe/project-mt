import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await req.json()

    const wishlist = await prisma.wishlist.create({
      data: {
        userId: session.user.id,
        productId,
      },
    })

    return NextResponse.json(wishlist, { status: 201 })
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Already in wishlist" }, { status: 400 })
    }
    console.error("Wishlist add error:", error)
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: session.user.id },
      include: {
        product: true
      },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(wishlist)
  } catch (error) {
    console.error("Wishlist fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    await prisma.wishlist.deleteMany({
      where: {
        userId: session.user.id,
        productId,
      },
    })

    return NextResponse.json({ message: "Removed from wishlist" })
  } catch (error) {
    console.error("Wishlist remove error:", error)
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 })
  }
}
