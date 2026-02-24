import {
  prisma
} from '../prisma/client.js';

export async function getCustomersService() {
  return prisma.customer.findMany({});
}

export async function getCustomerByIdService(id) {
  return prisma.customer.findUnique({
    where: {
      id
    },
    include: {
      deliveryAddresses: true,
      contactPersons: true
    }
  });
}

export async function createCustomerService(data) {
  return prisma.$transaction(async (prismaTx) => {    
    const customer = await prismaTx.customer.create({
      data: {
        isPerson: data.isPerson,
        firstName: data.isPerson ? data.firstName : null,
        lastName: data.isPerson ? data.lastName : null,
        companyName: data.isPerson ? null : data.companyName,
        vatNumber: data.isPerson ? null : data.vatNumber || null,
        email: data.email,
        phone: data.phone,
        billingAddress: data.billingAddress,
        billingPostal: data.billingPostal,
        billingCity: data.billingCity
      }
    });

    const customerId = customer.id;
    
    await createDeliveryAddresses(prismaTx, customerId, data.deliveryAddresses || []);
    
    await createContactPersons(prismaTx, customerId, data.contactPersons || []);
    
    return prismaTx.customer.findUnique({
      where: {
        id: customerId
      },
      include: {
        deliveryAddresses: true,
        contactPersons: true
      }
    });
  });
}

async function createDeliveryAddresses(prismaTx, customerId, addresses) {
  for (const addr of addresses) {
    await prismaTx.deliveryAddress.create({
      data: {
        customerId,
        address: addr.address,
        postalCode: addr.postalCode,
        city: addr.city
      }
    });
  }
}

async function createContactPersons(prismaTx, customerId, persons) {
  for (const person of persons) {
    await prismaTx.contactPerson.create({
      data: {
        customerId,
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        phone: person.phone,
        isPrimary: person.isPrimary || false
      }
    });
  }
}

export async function updateCustomerService(id, data) {   
  return prisma.$transaction(async (prismaTx) => {    
    const customer = await prismaTx.customer.update({
      
      where: {
        id
      },
      data: {
        isPerson: data.isPerson,
        firstName: data.isPerson ? data.firstName : null,
        lastName: data.isPerson ? data.lastName : null,
        companyName: data.isPerson ? null : data.companyName,
        vatNumber: data.isPerson ? null : data.vatNumber || null,
        email: data.email,
        phone: data.phone,
        billingAddress: data.billingAddress,
        billingPostal: data.billingPostal,
        billingCity: data.billingCity
      }
    });
    
    
    await syncDeliveryAddresses(prismaTx, id, data.deliveryAddresses || []);
    
    await syncContactPersons(prismaTx, id, data.contactPersons || []);
    
    return prismaTx.customer.findUnique({
      where: {
        id
      },
      include: {
        deliveryAddresses: true,
        contactPersons: true
      }
    });
  });
}

async function syncDeliveryAddresses(prismaTx, customerId, addresses) {  
  await prismaTx.deliveryAddress.deleteMany({
    where: {
      customerId,
      id: {
        notIn: addresses.filter(a => a.id).map(a => a.id)
        
      }
    }
  });
  
  for (const addr of addresses) {
    if (addr.id) {
      await prismaTx.deliveryAddress.update({
        where: {
          id: addr.id
        },
        data: {          
          address: addr.address,
          postalCode: addr.postalCode,
          city: addr.city
        }
      });
    } else {
      await prismaTx.deliveryAddress.create({
        data: {         
          customerId,
          address: addr.address,
          postalCode: addr.postalCode,
          city: addr.city
        }
      });
    }
  }
}

async function syncContactPersons(prismaTx, customerId, persons) {
  await prismaTx.contactPerson.deleteMany({
    where: {
      customerId,
      id: {
        notIn: persons.filter(p => p.id).map(p => p.id)
      }
    }
  });

  for (const person of persons) {
    if (person.id) {
      await prismaTx.contactPerson.update({
        where: {
          id: person.id
        },
        data: {
          firstName: person.firstName,
          lastName: person.lastName,
          email: person.email,
          phone: person.phone,
          isPrimary: person.isPrimary || false
        }
      });
    } else {
      await prismaTx.contactPerson.create({
        data: {
          customerId,
          firstName: person.firstName,
          lastName: person.lastName,
          email: person.email,
          phone: person.phone,
          isPrimary: person.isPrimary || false
        }
      });
    }
  }
}


export async function deleteCustomerService(id) {
  return prisma.customer.delete({
    where: {
      id
    }
  });
}