import {
    handleAsync
} from '../helpers/handleAsync.js';
import { parseId } from '../helpers/validators.js';
import {
    getProductTypesService,
    getProductTypeByIdService,
    createProductTypeService,
    updateProductTypeService,
    deleteProductTypeService
} from "./productTypeService.js";

export const getProductTypes = handleAsync(async (req, res) => {
    const productTypes = await getProductTypesService();
    res.json(productTypes);
});

export const getProductTypeById = handleAsync(async (req, res) => {
   const id = parseId(req.params.id);

    const productType = await getProductTypeByIdService(id);
    if (!productType) return res.status(404).json({
        error: 'Product type not found'
    });

    res.json(productType);
});

export const createProductType = handleAsync(async (req, res) => {
    const data = req.body;
    const newProductType = await createProductTypeService(data);
    res.status(201).json(newProductType);
});

export const updateProductType = handleAsync(async (req, res) => {
   const id = parseId(req.params.id);

    const data = req.body;
    const updatedProductType = await updateProductTypeService(id, data);
    res.json(updatedProductType);
});

export const deleteProductType = handleAsync(async (req, res) => {
    const id = parseId(req.params.id);

    await deleteProductTypeService(id);
    res.status(204).send();
});