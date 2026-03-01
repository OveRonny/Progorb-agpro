import {
    prisma
} from '../prisma/client.js';

export async function getProductService() {
    return prisma.product.findMany({
        include: {
            productType: true
        }
    });
}

export async function getProductByIdService(id) {
    return prisma.product.findUnique({
        where: {
            id
        }
    });
}

export async function createProductService(data) {
    return prisma.product.create({
        data: {
            nobbnr: data.nobbnr,
            description: data.description,
            price: data.price,
            unit: data.unit,
            meterPerSquare: data.meterPerSquare,
            productTypeId: data.productTypeId
        }
    });
}

export async function updateProductService(id, data) {
    return prisma.product.update({
        where: {
            id
        },
        data: {
            nobbnr: data.nobbnr,
            description: data.description,
            price: data.price,
            unit: data.unit,
            meterPerSquare: data.meterPerSquare,
            productTypeId: data.productTypeId
        }
    });
}

export async function deleteProductService(id) {
    return prisma.product.delete({
        where: {
            id
        }
    });
}

export async function getUnitsService(req, res) {
    try {        
        const result = await prisma.$queryRaw `
      SELECT unnest(enum_range(NULL::"Unit")) AS unit;
    `
        const units = result.map(r => r.unit)
        res.json(units)      
        
    } catch (err) {
        console.error('Feil i getUnitsService:', err)
        res.status(500).json({
            error: 'Kunne ikke hente units'
        })
    }
}