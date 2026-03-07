import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// Cleanup old pending eSewa orders (run daily via cron)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete orders pending for more than 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await prisma.order.deleteMany({
      where: {
        paymentStatus: 'pending',
        paymentMethod: 'esewa',
        createdAt: {
          lt: oneDayAgo
        }
      }
    });

    return NextResponse.json({ 
      message: 'Cleanup completed',
      deleted: result.count 
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}
