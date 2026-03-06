import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { sendOrderConfirmationEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items, shipping, payment, total } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    // Fetch actual products to get valid ObjectIds
    const productIds = items.map((item: any) => item.productId || item.id);
    
    // Filter only valid MongoDB ObjectIds (24 characters)
    const validIds = productIds.filter((id: string) => typeof id === 'string' && id.length === 24);
    
    if (validIds.length === 0) {
      return NextResponse.json({ 
        error: "Invalid cart data. Please clear your cart and add products again.",
        clearCart: true 
      }, { status: 400 });
    }
    
    const products = await prisma.product.findMany({
      where: { id: { in: validIds } }
    });

    // Map cart items to order items with valid ObjectIds
    const validItems = items
      .filter((item: any) => {
        const id = item.productId || item.id;
        return typeof id === 'string' && id.length === 24;
      })
      .map((item: any) => {
        const product = products.find(p => p.id === (item.productId || item.id));
        if (!product) {
          throw new Error(`Product not found in database`);
        }
        return {
          productId: product.id,
          quantity: item.quantity,
          price: item.price,
        };
      });

    if (validItems.length === 0) {
      return NextResponse.json({ 
        error: "No valid products in cart. Please add products again.",
        clearCart: true 
      }, { status: 400 });
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`

    // Calculate subtotal and shipping
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    const shippingCost = subtotal > 3000 ? 0 : 150

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        total,
        subtotal,
        shipping: shippingCost,
        status: "Processing",
        paymentMethod: payment.method,
        shippingAddress: shipping,
        items: {
          create: validItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    // Send order confirmation email (to verified email in development)
    const emailTo = process.env.NODE_ENV === 'production' ? shipping.email : 'sujanbakhunchhe950@gmail.com';
    console.log('Sending order email to:', emailTo, 'Environment:', process.env.NODE_ENV);
    const emailResult = await sendOrderConfirmationEmail(emailTo, {
      orderNumber,
      total,
      items: order.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
      })),
    })

    if (!emailResult.success) {
      console.error("Failed to send order confirmation email:", emailResult.error);
    }

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ 
      error: "Failed to create order",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
