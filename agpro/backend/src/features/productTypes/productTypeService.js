import {
  prisma
} from '../prisma/client.js';

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
  return prisma.productType.create({
    data: {
        name: data.name    }
  });
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