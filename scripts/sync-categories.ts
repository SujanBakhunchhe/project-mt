import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function syncCategories() {
  // Get all unique categories from products
  const products = await prisma.product.findMany({
    select: { category: true }
  });

  const uniqueCategories = [...new Set(products.map(p => p.category))];

  console.log(`Found ${uniqueCategories.length} unique categories in products:`, uniqueCategories);

  // Create categories that don't exist
  for (const categoryName of uniqueCategories) {
    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName }
    });
    console.log(`✓ Synced: ${categoryName}`);
  }

  console.log('\n✅ All categories synced!');
  await prisma.$disconnect();
}

syncCategories();
