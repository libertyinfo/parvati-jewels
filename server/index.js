const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');

const prisma = new PrismaClient();
const app = express();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

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
        minPrice,
        maxPrice
      };
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

    const mailOptions = {
      from: process.env.SMTP_USER || '"Parvati Jewels" <noreply@parvatijewels.com>',
      to: 'dhvani.lis21@gmail.com',
      subject: `New ${type === 'product' ? 'Product' : 'General'} Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${type}\n${metal ? `Metal: ${metal}\n` : ''}${categories && categories.length > 0 ? `Categories: ${categories.join(', ')}\n` : ''}${productDetails}\n\nMessage:\n${message || 'No message provided'}`
    };

    const customerMailOptions = {
      from: process.env.SMTP_USER || '"Parvati Jewels" <noreply@parvatijewels.com>',
      to: email,
      subject: `Thank you for your Inquiry - Parvati Jewels`,
      text: `Dear ${name},\n\nYour inquiry has been submitted successfully. Thank you for reaching out to us. We will get back to you shortly!\n\nBest Regards,\nParvati Jewels`
    };

    try {
      if (process.env.SMTP_USER) {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(customerMailOptions);
      } else {
        console.log('--- Email Simulation (Configure SMTP in .env to send for real) ---');
        console.log('Admin Email:', mailOptions);
        console.log('Customer Email:', customerMailOptions);
      }
    } catch (mailError) {
      console.error('Error sending email:', mailError);
    }

    res.status(201).json(inquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

const PORT = process.env.PORT || 5055;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
