import express from 'express';
import {getProducts, getProductById, createProduct ,updateProduct, deleteProduct, getUnits } from './productController.js';

const router = express.Router();


router.get('/units', getUnits);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;