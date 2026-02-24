import {
    handleAsync
} from '../helpers/handleAsync.js';
import { parseId } from '../helpers/validators.js';
import { getOrderService, getOrderByIdService, createOrderService } from './orderservice.js';   

export const getOrders = handleAsync(async (req, res) => {
    const orders = await getOrderService();
    res.json(orders);
});

export const getOrderById = handleAsync(async (req, res) => {
    const id = parseId(req.params.id);
    const order = await getOrderByIdService(id);
    if(!order) return res.status(404).json({
        error: 'Order not found'
        
    });
    res.json(order);
});

export const createOrder = handleAsync( async (req, res) => {
   const order = await createOrderService();
   res.json(order);
});