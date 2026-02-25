import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './features/auth/authRoutes.js';
import customerRoutes from './features/customers/customerRoutes.js';
import productRoutes from './features/products/productRoutes.js';
import productTypes from './features/productTypes/productTypeRoutes.js';
import orderRoutes from './features/orders/orderRoutes.js'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter }); 

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/customers', customerRoutes);
app.use('/products', productRoutes); 
app.use('/product-types', productTypes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

