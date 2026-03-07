import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function makeAdmin() {
  try {
    const user = await prisma.user.update({
      where: { email: 'bjayshb1@gmail.com' },
      data: { role: 'admin' }
    });
    
    console.log('✅ User is now admin:', user.email);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();
