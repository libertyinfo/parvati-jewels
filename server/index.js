const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { pickStoneShape, STONE_SHAPES } = require('./lib/productSpecifications');
const { verifySmtpOnStartup, sendInquiryEmails } = require('./lib/inquiryMail');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { children: true }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get all products (for listing page)
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    let where = {};
    if (category) {
      where = {
        OR: [
          { category: { slug: category } },
          { category: { parent: { slug: category } } }
        ]
      };
    }
    
    const products = await prisma.product.findMany({
      where,
      include: {
        images: {
          where: { isPrimary: true },
          take: 1
        },
        variants: true
      }
    });

    const parseStoneShape = (variant) => {
      if (!variant?.specifications) return null;
      try {
        const specs =
          typeof variant.specifications === 'string'
            ? JSON.parse(variant.specifications)
            : variant.specifications;
        return specs.stone_shape || null;
      } catch {
        return null;
      }
    };

    // Format products for listing
    const formattedProducts = products.map(product => {
      let minPrice = 0;
      let maxPrice = 0;
      if (product.variants.length > 0) {
        const prices = product.variants.map(v => v.price);
        minPrice = Math.min(...prices);
        maxPrice = Math.max(...prices);
      }

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        isBestseller: product.isBestseller,
        primaryImage: product.images[0]?.imageUrl || null,
        stoneShape:
          parseStoneShape(product.variants[0]) ||
          pickStoneShape({ id: product.id, slug: product.slug }),
        minPrice,
        maxPrice
      };
    });

    formattedProducts.sort((a, b) => {
      const ia = STONE_SHAPES.indexOf(a.stoneShape || '');
      const ib = STONE_SHAPES.indexOf(b.stoneShape || '');
      const orderA = ia === -1 ? STONE_SHAPES.length : ia;
      const orderB = ib === -1 ? STONE_SHAPES.length : ib;
      if (orderA !== orderB) return orderA - orderB;
      return String(a.name).localeCompare(String(b.name));
    });

    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product details
app.get('/api/products/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        variants: true
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

// Submit a new inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { type, name, email, phone, metal, categories, message, productId } = req.body;

    const inquiry = await prisma.inquiry.create({
      data: {
        type,
        name,
        email,
        phone,
        metal,
        categories: categories ? JSON.stringify(categories) : null,
        message,
        productId
      }
    });

    let productDetails = '';
    if (productId) {
      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (product) productDetails = `\nProduct Inquired: ${product.name} (ID: ${product.id})`;
    }

    const mailResult = await sendInquiryEmails({
      type,
      name,
      email,
      phone,
      metal,
      categories,
      message,
      productDetails,
    });

    res.status(201).json({
      ...inquiry,
      emailSent: mailResult.sent,
      ...(mailResult.error ? { emailError: mailResult.error } : {}),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

const PORT = process.env.PORT || 5055;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  verifySmtpOnStartup();
});
