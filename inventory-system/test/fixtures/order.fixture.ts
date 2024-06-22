/* eslint-disable import/no-extraneous-dependencies */
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import prisma from '../../src/lib/database';
import { userOne } from './user.fixture';
import { productOne } from './product.fixture';

export function createFakeOrder(userId: string, customerName: string, customerEmail: string) {
  return {
    id: v4(),
    date: new Date(),
    userId,
    totalPrice: faker.number.int({ min: 10_000, max: 100_000 }),
    customerName,
    customerEmail,
  };
}

export function createFakeOrderItem(orderId: string, productId: string, unitPrice: number) {
  return {
    id: v4(),
    productId,
    orderId,
    quantity: faker.number.int({ min: 1, max: 3 }),
    unitPrice,
  };
}

export async function insertOrder(...orders: ReturnType<typeof createFakeOrder>[]) {
  await prisma.order.createMany({
    data: orders,
    skipDuplicates: true,
  });
}

export async function insertOrderItem(...orderItems: ReturnType<typeof createFakeOrderItem>[]) {
  await prisma.orderItem.createMany({
    data: orderItems,
    skipDuplicates: true,
  });
}

export const orderOne = createFakeOrder(userOne.id, userOne.name, userOne.email);
export const orderItemOne = createFakeOrderItem(orderOne.id, productOne.id, productOne.price);
