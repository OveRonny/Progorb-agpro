import {
  prisma
} from '../prisma/client.js';
import  Result from "../helpers/result.js"

export async function getProductTypesService() {
  return prisma.productType.findMany({});
}

export async function getProductTypeByIdService(id) {
  return prisma.productType.findUnique({
    where: {
      id
    }
  });
}

export async function createProductTypeService(data) {
    try {        
        const newType = await prisma.productType.create({
            data: { name: data.name }
        });
        return Result.success(newType);

    } catch (err) {       
        if (err.code === 'P2002') {
            
            try {
                const existing = await prisma.productType.findUnique({
                    where: { name: data.name }
                });
                if (existing) {
                    return Result.alreadyExists(existing);
                }
            } catch {                
                return Result.failure("ProduktType finnes allerede");
            }
        }        
        return Result.failure(err.message);
    }
}

export async function updateProductTypeService(id, data) {
  return prisma.productType.update({
    where: {
      id
    },
    data: {
      name: data.name      
    }
  });
}

export async function deleteProductTypeService(id) {
  return prisma.productType.delete({
    where: {
      id
    }
  });
}