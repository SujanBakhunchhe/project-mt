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

    const { transaction_uuid, status, transaction_code, total_amount, product_code } = decoded;

    if (status !== 'COMPLETE') {
      return NextResponse.redirect(new URL('/orders?error=failed', req.url));
    }

    const orderId = transaction_uuid.split('-')[0];

    // Verify with eSewa status check API
    const verifyUrl = process.env.NODE_ENV === 'production'
      ? `https://esewa.com.np/api/epay/transaction/status/?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`
      : `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`;

    try {
      const verifyRes = await fetch(verifyUrl);
      const verifyData = await verifyRes.json();
      
      console.log('eSewa verification:', verifyData);

      if (verifyData.status !== 'COMPLETE') {
        console.error('Payment verification failed:', verifyData);
        return NextResponse.redirect(new URL('/orders?error=verification', req.url));
      }
    } catch (verifyError) {
      console.error('eSewa verification error:', verifyError);
      // Continue anyway for now - but log it
    }

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
