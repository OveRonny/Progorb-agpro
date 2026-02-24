import {
    handleAsync
} from '../helpers/handleAsync.js';
import { parseId } from '../helpers/validators.js';
import {
    getProductService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService,
    getUnitsService
 
} from './productService.js';

export const getProducts = handleAsync(async (req, res) => {
    const products = await getProductService();
    res.json(products);
});

export const getProductById = handleAsync(async (req, res) => {
    const id = parseId(req.params.id);
    const product = await getProductByIdService(id);
    if (!product) return res.status(404).json({
        error: 'Product not found'
    });
    res.json(product);
});


export const createProduct = handleAsync(async (req, res) => {
    const data = req.body;
    const newProduct = await createProductService(data);
    res.status(201).json(newProduct);
});

export const updateProduct = handleAsync(async (req, res) => {
    const id = parseId(req.params.id);
    const data = req.body;
    const updatedProduct = await updateProductService(id, data);
    res.json(updatedProduct);
});

export const deleteProduct = handleAsync(async (req, res) => {
    const id = parseId(req.params.id);
    await deleteProductService(id);
    res.status(204).send();
});

export const getUnits = handleAsync(async (req, res) => {
    await getUnitsService(req, res);
});



