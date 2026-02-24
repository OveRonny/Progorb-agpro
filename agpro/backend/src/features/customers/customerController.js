import {
    handleAsync
} from '../helpers/handleAsync.js';
import {
    parseId
} from '../helpers/validators.js';
import {
    getCustomersService,
    getCustomerByIdService,
    createCustomerService,
    updateCustomerService,
    deleteCustomerService
} from "./customerService.js";

export const getCustomers = handleAsync(async (req, res) => {
    const customers = await getCustomersService();
    res.json(customers);
});

export const getCustomerById = handleAsync(async (req, res) => {
    const id = parseId(req.params.id);
    const customer = await getCustomerByIdService(id);
    if (!customer) return res.status(404).json({
        error: 'Customer not found'
    });
    res.json(customer);
});

export const createCustomer = handleAsync(async (req, res) => {
    const data = req.body;
    const newCustomer = await createCustomerService(data);
    res.status(201).json(newCustomer);
});


export const updateCustomer = handleAsync(async (req, res) => {
    const id = parseId(req.params.id);
    const data = req.body;
    const updatedCustomer = await updateCustomerService(id, data);
    res.json(updatedCustomer);
});

export const deleteCustomer = handleAsync(async (req, res) => {
    const id = parseId(req.params.id);
    await deleteCustomerService(id);
    res.status(204).send();
});