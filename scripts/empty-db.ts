import { prisma } from "../src/lib/prisma";

async function emptyDatabase() {
  try {
    console.log("🗑️  Emptying database...");

    // Delete in correct order (child tables first)
    await prisma.orderItem.deleteMany();
    console.log("✓ Deleted order items");

    await prisma.order.deleteMany();
    console.log("✓ Deleted orders");

    await prisma.review.deleteMany();
    console.log("✓ Deleted reviews");

    await prisma.wishlist.deleteMany();
    console.log("✓ Deleted wishlist items");

    await prisma.product.deleteMany();
    console.log("✓ Deleted products");

    await prisma.bikeModel.deleteMany();
    console.log("✓ Deleted bike models");

    await prisma.bikeBrand.deleteMany();
    console.log("✓ Deleted bike brands");

    await prisma.contact.deleteMany();
    console.log("✓ Deleted contact messages");

    await prisma.account.deleteMany();
    console.log("✓ Deleted accounts");

    await prisma.session.deleteMany();
    console.log("✓ Deleted sessions");

    await prisma.user.deleteMany();
    console.log("✓ Deleted users");

    console.log("\n✅ Database emptied successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

emptyDatabase();
