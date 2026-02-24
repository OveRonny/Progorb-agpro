import QUnit from "qunit";
import {
    prisma
} from '../features/prisma/client.js';
import {
    createOrderService
} from '../features/orders/orderservice.js';

const {
    module,
    test
} = QUnit;

module('Order tests', hooks => {
   
    let customer;
    let deliveryAddress;
    let contactPerson;
    let product1;
    let product2;

    
    hooks.before(async () => {
        await prisma.orderLine.deleteMany();
        await prisma.order.deleteMany();
        await prisma.deliveryAddress.deleteMany();
        await prisma.contactPerson.deleteMany();
        await prisma.customer.deleteMany();
        await prisma.product.deleteMany();
        await prisma.productType.deleteMany();

        
        customer = await prisma.customer.create({
            data: {
                isPerson: true,
                firstName: 'Ola',
                lastName: 'Nordmann',
                email: 'ola@example.com',
                phone: '12345678',
                billingAddress: 'Testveien 1',
                billingPostal: '0001',
                billingCity: 'Oslo',
                deliveryAddresses: {
                    create: [{
                        address: 'Testveien 1',
                        postalCode: '0001',
                        city: 'Oslo',
                        isDefault: true
                    }]
                },
                contactPersons: {
                    create: [{
                        firstName: 'Kari',
                        lastName: 'Nordmann',
                        email: 'kari@example.com',
                        phone: '87654321',
                        isPrimary: true
                    }]
                }
            },
            include: {
                deliveryAddresses: true,
                contactPersons: true
            }
        });

        deliveryAddress = customer.deliveryAddresses[0];
        contactPerson = customer.contactPersons[0];

        const productType = await prisma.productType.create({
            data: {
                name: 'Trevarer'
            }
        });

        product1 = await prisma.product.create({
            data: {
                nobbnr: 'P001',
                description: 'Testprodukt',
                price: 100,
                unit: 'STK',
                productTypeId: productType.id
            }
        });
        product2 = await prisma.product.create({
            data: {
                nobbnr: 'P002',
                description: 'Testprodukt2',
                price: 50,
                unit: 'STK',
                productTypeId: productType.id
            }
        });
    });

    test('createOrder creates an order with orderLines', async (assert) => {
        const orderData = {
            ordreNr: 1,
            bestNr: 'B001',
            customerId: customer.id,
            deliveryAddressId: deliveryAddress.id,
            contactPersonId: contactPerson.id,
            orderLines: [{
                    productId: product1.id,
                    priceLine: 100,
                    discount: 0,
                    quantity: 2,
                    vatRate: 25
                }               
            ]
        };

        const newOrder = await createOrderService(orderData);

        assert.ok(newOrder.id, 'Order should have an ID');
        assert.ok(newOrder.ordreNr, 'Order should have an ordreNr');
        assert.equal(newOrder.orderLines.length, 1, 'Order should have 1 lines');
        assert.ok(newOrder.customer, 'Order should include customer info');
        assert.ok(newOrder.deliveryAddress, 'Order should include delivery address');        
    });
});