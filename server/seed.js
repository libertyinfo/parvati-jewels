const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Categories
  const ringsCategory = await prisma.category.upsert({
    where: { slug: 'rings' },
    update: {},
    create: {
      name: 'Rings',
      slug: 'rings',
    }
  });

  const loveRingCategory = await prisma.category.upsert({
    where: { slug: 'love-ring' },
    update: {},
    create: {
      name: 'Love Ring',
      slug: 'love-ring',
      parentId: ringsCategory.id
    }
  });

  const lockRingCategory = await prisma.category.upsert({
    where: { slug: 'lock-ring' },
    update: {},
    create: {
      name: 'Lock Ring',
      slug: 'lock-ring',
      parentId: ringsCategory.id
    }
  });

  const vineRingCategory = await prisma.category.upsert({
    where: { slug: 'vine-ring' },
    update: {},
    create: {
      name: 'Vine Ring',
      slug: 'vine-ring',
      parentId: ringsCategory.id
    }
  });

  const weddingRingCategory = await prisma.category.upsert({
    where: { slug: 'wedding-ring' },
    update: {},
    create: {
      name: 'Wedding Ring',
      slug: 'wedding-ring',
      parentId: ringsCategory.id
    }
  });

  // 2. Create Products
  const ring1 = await prisma.product.upsert({
    where: { slug: 'ring1' },
    update: {},
    create: {
      name: 'Love Ring',
      slug: 'ring1',
      categoryId: loveRingCategory.id,
      description: 'A beautiful Love Ring in 18K Yellow Gold.',
      isBestseller: false,
      images: {
        create: [
          { imageUrl: '/src/assets/rings/love.png', sortOrder: 1, isPrimary: true }
        ]
      },
      variants: {
        create: [
          {
            sku: 'RING1-6',
            size: '6',
            price: 45.00,
            comparePrice: 60.00,
            specifications: JSON.stringify({
              "diamond_weight": "0.30ct",
              "dimensions": "3.5mm",
              "stone_shape": "Round",
              "diamond_quality": "H/SI",
              "setting": "Nickel free",
              "diamond_band": "No"
            })
          }
        ]
      }
    }
  });

  const ring2 = await prisma.product.upsert({
    where: { slug: 'ring2' },
    update: {},
    create: {
      name: 'Lock Ring',
      slug: 'ring2',
      categoryId: lockRingCategory.id,
      description: 'Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut et dolore magna aliqua. Ut ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ex ea consequat.',
      isBestseller: true,
      images: {
        create: [
          { imageUrl: '/src/assets/rings/lock.png', sortOrder: 1, isPrimary: true }
        ]
      },
      variants: {
        create: [
          {
            sku: 'RING2-7',
            size: '7',
            metal: '18K Rose Gold',
            price: 30.00,
            comparePrice: 50.00,
            stock: 10,
            specifications: JSON.stringify({
              "diamond_weight": "0.50ct",
              "dimensions": "4.4mm",
              "stone_shape": "Round",
              "diamond_quality": "H/SI",
              "setting": "Nickel free",
              "diamond_band": "Yes"
            })
          },
          {
            sku: 'RING2-8',
            size: '8',
            metal: '18K Rose Gold',
            price: 35.00,
            comparePrice: 50.00,
            stock: 5,
            specifications: JSON.stringify({
              "diamond_weight": "0.50ct",
              "dimensions": "4.4mm",
              "stone_shape": "Round",
              "diamond_quality": "H/SI",
              "setting": "Nickel free",
              "diamond_band": "Yes"
            })
          }
        ]
      }
    }
  });

  const ring3 = await prisma.product.upsert({
    where: { slug: 'ring3' },
    update: {},
    create: {
      name: 'Vine Ring',
      slug: 'ring3',
      categoryId: vineRingCategory.id,
      description: 'Elegant Vine Ring crafted in Platinum.',
      isBestseller: false,
      images: {
        create: [
          { imageUrl: '/src/assets/rings/vine.png', sortOrder: 1, isPrimary: true }
        ]
      },
      variants: {
        create: [
          {
            sku: 'RING3-6',
            size: '6',
            price: 80.00,
            specifications: JSON.stringify({
              "stone_shape": "Pear"
            })
          }
        ]
      }
    }
  });

  const ring4 = await prisma.product.upsert({
    where: { slug: 'ring4' },
    update: {},
    create: {
      name: 'Wedding Ring',
      slug: 'ring4',
      categoryId: weddingRingCategory.id,
      description: 'Classic Wedding Ring in 18K White Gold.',
      isBestseller: false,
      images: {
        create: [
          { imageUrl: '/src/assets/rings/wedding.png', sortOrder: 1, isPrimary: true }
        ]
      },
      variants: {
        create: [
          {
            sku: 'RING4-7',
            size: '7',
            price: 55.00,
            specifications: JSON.stringify({
              "diamond_weight": "0.10ct",
              "stone_shape": "Round"
            })
          }
        ]
      }
    }
  });

  // --- New Categories ---
  const earringsCategory = await prisma.category.upsert({
    where: { slug: 'earrings' }, update: {},
    create: { name: 'Earrings', slug: 'earrings' }
  });
  const necklaceCategory = await prisma.category.upsert({
    where: { slug: 'necklace' }, update: {},
    create: { name: 'Necklace', slug: 'necklace' }
  });
  const braceletCategory = await prisma.category.upsert({
    where: { slug: 'bracelets' }, update: {},
    create: { name: 'Bracelets', slug: 'bracelets' }
  });
  const pendantCategory = await prisma.category.upsert({
    where: { slug: 'pendant' }, update: {},
    create: { name: 'Pendant', slug: 'pendant' }
  });

  // --- New Products ---
  await prisma.product.upsert({
    where: { slug: 'earring1' }, update: {},
    create: {
      name: 'Drop Diamond Earring', slug: 'earring1', categoryId: earringsCategory.id,
      description: 'Elegant drop diamond earrings.', isBestseller: true,
      images: { create: [{ imageUrl: '/src/assets/earrings/dropdiamond-earring.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'EAR1', price: 120.00 }] }
    }
  });
  await prisma.product.upsert({
    where: { slug: 'earring2' }, update: {},
    create: {
      name: 'Hoop Earring', slug: 'earring2', categoryId: earringsCategory.id,
      description: 'Classic hoop earrings.', isBestseller: false,
      images: { create: [{ imageUrl: '/src/assets/earrings/hoop-earring.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'EAR2', price: 80.00 }] }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'necklace1' }, update: {},
    create: {
      name: 'Pearshape Necklace', slug: 'necklace1', categoryId: necklaceCategory.id,
      description: 'Beautiful pearshape necklace.', isBestseller: true,
      images: { create: [{ imageUrl: '/src/assets/necklace/pearshape-necklace.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'NECK1', price: 150.00 }] }
    }
  });
  await prisma.product.upsert({
    where: { slug: 'necklace2' }, update: {},
    create: {
      name: 'Solitaire Necklace', slug: 'necklace2', categoryId: necklaceCategory.id,
      description: 'Stunning solitaire necklace.', isBestseller: false,
      images: { create: [{ imageUrl: '/src/assets/necklace/solitaire-necklace.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'NECK2', price: 130.00 }] }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'bracelet1' }, update: {},
    create: {
      name: 'Tennis Bracelet', slug: 'bracelet1', categoryId: braceletCategory.id,
      description: 'Classic tennis bracelet.', isBestseller: true,
      images: { create: [{ imageUrl: '/src/assets/bracelets/tennis-bracelet.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'BRAC1', price: 90.00 }] }
    }
  });
  await prisma.product.upsert({
    where: { slug: 'bracelet2' }, update: {},
    create: {
      name: 'Gold Knot Bracelet', slug: 'bracelet2', categoryId: braceletCategory.id,
      description: 'Elegant gold knot bracelet.', isBestseller: false,
      images: { create: [{ imageUrl: '/src/assets/bracelets/goldknot-bracelet.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'BRAC2', price: 75.00 }] }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'pendant1' }, update: {},
    create: {
      name: 'Teardrop Pendant', slug: 'pendant1', categoryId: pendantCategory.id,
      description: 'Beautiful teardrop pendant.', isBestseller: true,
      images: { create: [{ imageUrl: '/src/assets/pendant/teardrop-pendant.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'PEND1', price: 60.00 }] }
    }
  });
  await prisma.product.upsert({
    where: { slug: 'pendant2' }, update: {},
    create: {
      name: 'Cultural Pendant', slug: 'pendant2', categoryId: pendantCategory.id,
      description: 'Traditional cultural pendant.', isBestseller: false,
      images: { create: [{ imageUrl: '/src/assets/pendant/cultural-pendant.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'PEND2', price: 55.00 }] }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'earring3' }, update: {},
    create: {
      name: 'Diamond Earring', slug: 'earring3', categoryId: earringsCategory.id,
      description: 'Classic diamond earrings.', isBestseller: false,
      images: { create: [{ imageUrl: '/src/assets/earrings/earring.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'EAR3', price: 95.00 }] }
    }
  });
  await prisma.product.upsert({
    where: { slug: 'earring4' }, update: {},
    create: {
      name: 'Round Earring', slug: 'earring4', categoryId: earringsCategory.id,
      description: 'Elegant round earrings.', isBestseller: true,
      images: { create: [{ imageUrl: '/src/assets/earrings/round-earring.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'EAR4', price: 110.00 }] }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'bracelet3' }, update: {},
    create: {
      name: 'Chetah Bracelet', slug: 'bracelet3', categoryId: braceletCategory.id,
      description: 'Stylish chetah bracelet.', isBestseller: false,
      images: { create: [{ imageUrl: '/src/assets/bracelets/chetah-bracelet.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'BRAC3', price: 105.00 }] }
    }
  });
  await prisma.product.upsert({
    where: { slug: 'bracelet4' }, update: {},
    create: {
      name: 'Vermeil Twist Bracelet', slug: 'bracelet4', categoryId: braceletCategory.id,
      description: 'Beautiful vermeil twist bracelet.', isBestseller: true,
      images: { create: [{ imageUrl: '/src/assets/bracelets/vermeiltwist-bracelet.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'BRAC4', price: 125.00 }] }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'necklace3' }, update: {},
    create: {
      name: 'Pendant Necklace', slug: 'necklace3', categoryId: necklaceCategory.id,
      description: 'Elegant pendant necklace.', isBestseller: true,
      images: { create: [{ imageUrl: '/src/assets/necklace/pendant-necklace.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'NECK3', price: 140.00 }] }
    }
  });
  await prisma.product.upsert({
    where: { slug: 'necklace4' }, update: {},
    create: {
      name: 'Silver Crystal Necklace', slug: 'necklace4', categoryId: necklaceCategory.id,
      description: 'Stunning silver crystal necklace.', isBestseller: false,
      images: { create: [{ imageUrl: '/src/assets/necklace/silvercrystal-necklace.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'NECK4', price: 115.00 }] }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'pendant3' }, update: {},
    create: {
      name: 'Moissanite Diamond Pendant', slug: 'pendant3', categoryId: pendantCategory.id,
      description: 'Brilliant moissanite diamond pendant.', isBestseller: true,
      images: { create: [{ imageUrl: '/src/assets/pendant/moissanitediamond-pendant.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'PEND3', price: 180.00 }] }
    }
  });
  await prisma.product.upsert({
    where: { slug: 'pendant4' }, update: {},
    create: {
      name: 'Pear Pendant', slug: 'pendant4', categoryId: pendantCategory.id,
      description: 'Elegant pear-shaped pendant.', isBestseller: false,
      images: { create: [{ imageUrl: '/src/assets/pendant/pear-pendant.png', sortOrder: 1, isPrimary: true }] },
      variants: { create: [{ sku: 'PEND4', price: 85.00 }] }
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
