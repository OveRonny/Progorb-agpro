import {
    prisma
} from '../prisma/client.js';

export async function getOrderService() {
    return prisma.order.findMany();
}

export async function getOrderByIdService(id) {
    return prisma.order.findUnique({
        where: {
            id
        },
        include: {
            orderLines: true,
            customer: true,
            deliveryAddress: true,
            contactPerson: true
        }
    });
}

export async function createOrderService(data) {
    if (!data) throw new Error("Missing order data");
    if (!data.ordreNr) throw new Error("Missing ordreNr");
    if (!data.customerId) throw new Error("Missing customerId");
    if (!data.deliveryAddressId) throw new Error("Missing deliveryAddressId");
    if (!data.orderLines || !Array.isArray(data.orderLines))
        throw new Error("Missing orderLines array");
    return prisma.$transaction(async (prismaTx) => {
        const order = await prismaTx.order.create({
            data: {
                ordreNr: data.ordreNr,
                bestNr: data.bestNr,
                customerId: data.customerId,
                deliveryAddressId: data.deliveryAddressId,
                contactPersonId: data.contactPersonId ?? null,
                orderLines: {
                    create: data.orderLines.map(line => ({
                        productId: line.productId,
                        priceLine: line.priceLine,
                        discount: line.discount ?? 0,
                        quantity: line.quantity,
                        vatRate: line.vatRate ?? 25
                    }))
                }
            },
            include: {
                orderLines: true,
                customer: true,
                deliveryAddress: true,
                contactPerson: true
            }
        });

        return order;
    });
}

async function getOrderById(prismaClient, id) {
    return prismaClient.order.findUnique({
        where: {
            id
        },
        include: {
            orderLines: true,
            customer: true,
            deliveryAddress: true,
            contactPerson: true
        }
    });
}