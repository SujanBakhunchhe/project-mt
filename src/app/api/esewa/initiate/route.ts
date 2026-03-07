import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { generateEsewaSignature } from '@/lib/esewa';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true }
    });

    if (!order || order.user.email !== session.user.email) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const transactionUuid = `${orderId}-${Date.now()}`;
    const totalAmount = order.total.toString();
    const productCode = process.env.ESEWA_PRODUCT_CODE || 'EPAYTEST';
    
    const signature = generateEsewaSignature(totalAmount, transactionUuid, productCode);

    const baseUrl = req.headers.get('origin') || 'http://localhost:3000';

    return NextResponse.json({
      amount: order.total.toString(),
      tax_amount: '0',
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
      product_code: productCode,
      product_service_charge: '0',
      product_delivery_charge: '0',
      success_url: `${baseUrl}/api/esewa/verify`,
      failure_url: `${baseUrl}/orders?error=payment-failed`,
      signed_field_names: 'total_amount,transaction_uuid,product_code',
      signature
    });
  } catch (error) {
    console.error('eSewa initiate error:', error);
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
  }
}
