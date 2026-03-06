import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  // Honda Parts
  {
    name: "Engine Oil Filter - Honda",
    price: 450,
    marketPrice: 600,
    brand: "Honda",
    category: "Engine",
    stock: 25,
    description: "High-quality engine oil filter for Honda motorcycles. Ensures optimal performance.",
    images: ["https://via.placeholder.com/400"],
    features: ["Premium filtration", "OEM compatible", "Easy installation"],
    specifications: { "Part Number": "HON-OF-001", "Warranty": "6 months" }
  },
  {
    name: "Brake Pads (Front) - Honda",
    price: 1200,
    marketPrice: 1500,
    brand: "Honda",
    category: "Brakes",
    stock: 15,
    description: "Premium front brake pads for Honda bikes. Superior stopping power.",
    images: ["https://via.placeholder.com/400"],
    features: ["High friction", "Low noise", "Long lasting"],
    specifications: { "Part Number": "HON-BP-001", "Warranty": "1 year" }
  },
  {
    name: "Air Filter - Honda",
    price: 350,
    marketPrice: 500,
    brand: "Honda",
    category: "Engine",
    stock: 30,
    description: "Genuine air filter for Honda motorcycles. Improves engine efficiency.",
    images: ["https://via.placeholder.com/400"],
    features: ["Washable", "Reusable", "Better airflow"],
    specifications: { "Part Number": "HON-AF-001", "Warranty": "6 months" }
  },
  
  // Yamaha Parts
  {
    name: "Chain Sprocket Kit - Yamaha",
    price: 2500,
    marketPrice: 3200,
    brand: "Yamaha",
    category: "Transmission",
    stock: 10,
    description: "Complete chain and sprocket kit for Yamaha bikes. Premium quality.",
    images: ["https://via.placeholder.com/400"],
    features: ["Heat treated", "Corrosion resistant", "Complete kit"],
    specifications: { "Part Number": "YAM-CS-001", "Warranty": "1 year" }
  },
  {
    name: "Headlight Bulb - Yamaha",
    price: 250,
    marketPrice: 350,
    brand: "Yamaha",
    category: "Electrical",
    stock: 40,
    description: "Bright LED headlight bulb for Yamaha motorcycles.",
    images: ["https://via.placeholder.com/400"],
    features: ["LED technology", "Energy efficient", "Long life"],
    specifications: { "Part Number": "YAM-HB-001", "Warranty": "1 year" }
  },
  {
    name: "Clutch Plates - Yamaha",
    price: 1800,
    marketPrice: 2300,
    brand: "Yamaha",
    category: "Transmission",
    stock: 12,
    description: "High-performance clutch plates for smooth gear shifting.",
    images: ["https://via.placeholder.com/400"],
    features: ["Smooth engagement", "Heat resistant", "Durable"],
    specifications: { "Part Number": "YAM-CP-001", "Warranty": "6 months" }
  },

  // Bajaj Parts
  {
    name: "Spark Plug - Bajaj",
    price: 180,
    marketPrice: 250,
    brand: "Bajaj",
    category: "Engine",
    stock: 50,
    description: "Premium spark plug for Bajaj motorcycles. Better ignition.",
    images: ["https://via.placeholder.com/400"],
    features: ["Iridium tip", "Better fuel efficiency", "Smooth start"],
    specifications: { "Part Number": "BAJ-SP-001", "Warranty": "6 months" }
  },
  {
    name: "Rear Shock Absorber - Bajaj",
    price: 3500,
    marketPrice: 4500,
    brand: "Bajaj",
    category: "Suspension",
    stock: 8,
    description: "Heavy-duty rear shock absorber for comfortable ride.",
    images: ["https://via.placeholder.com/400"],
    features: ["Adjustable", "Gas charged", "Smooth ride"],
    specifications: { "Part Number": "BAJ-SA-001", "Warranty": "1 year" }
  },
  {
    name: "Side Mirror Set - Bajaj",
    price: 600,
    marketPrice: 800,
    brand: "Bajaj",
    category: "Body",
    stock: 20,
    description: "Pair of side mirrors with clear visibility.",
    images: ["https://via.placeholder.com/400"],
    features: ["Wide angle", "Sturdy mount", "Clear view"],
    specifications: { "Part Number": "BAJ-SM-001", "Warranty": "6 months" }
  },

  // Hero Parts
  {
    name: "Battery 12V - Hero",
    price: 2200,
    marketPrice: 2800,
    brand: "Hero",
    category: "Electrical",
    stock: 15,
    description: "Maintenance-free battery for Hero motorcycles.",
    images: ["https://via.placeholder.com/400"],
    features: ["Maintenance free", "Long life", "Quick charge"],
    specifications: { "Part Number": "HER-BAT-001", "Warranty": "1 year" }
  },
  {
    name: "Carburetor - Hero",
    price: 1500,
    marketPrice: 2000,
    brand: "Hero",
    category: "Engine",
    stock: 10,
    description: "Genuine carburetor for Hero bikes. Better fuel efficiency.",
    images: ["https://via.placeholder.com/400"],
    features: ["Precise fuel mix", "Easy tuning", "Durable"],
    specifications: { "Part Number": "HER-CARB-001", "Warranty": "6 months" }
  },
  {
    name: "Handlebar Grip Set - Hero",
    price: 300,
    marketPrice: 450,
    brand: "Hero",
    category: "Body",
    stock: 35,
    description: "Comfortable handlebar grips with anti-slip design.",
    images: ["https://via.placeholder.com/400"],
    features: ["Anti-slip", "Comfortable", "Easy install"],
    specifications: { "Part Number": "HER-HG-001", "Warranty": "6 months" }
  },
]

async function main() {
  console.log('Start seeding...')
  
  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }
  
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
