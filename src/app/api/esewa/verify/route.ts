import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const data = searchParams.get('data');

    console.log('eSewa callback data:', data);

    if (!data) {
      return NextResponse.redirect(new URL('/orders?error=invalid', req.url));
    }

    const decoded = JSON.parse(Buffer.from(data, 'base64').toString());
    console.log('Decoded eSewa response:', decoded);

    const { transaction_uuid, status, transaction_code } = decoded;

    if (status !== 'COMPLETE') {
      return NextResponse.redirect(new URL('/orders?error=failed', req.url));
    }

    const orderId = transaction_uuid.split('-')[0];

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'paid',
        paymentMethod: 'esewa',
        transactionId: transaction_code || transaction_uuid
      }
    });

    return NextResponse.redirect(new URL(`/orders?success=true`, req.url));
  } catch (error) {
    console.error('eSewa verify error:', error);
    return NextResponse.redirect(new URL('/orders?error=verification', req.url));
  }
}
