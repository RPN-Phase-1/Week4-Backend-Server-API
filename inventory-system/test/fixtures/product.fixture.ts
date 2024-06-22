/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';
import { userOne } from './user.fixture';
import prisma from '../../src/lib/database';

type Category = Exclude<keyof typeof faker.animal, 'type'>;

export function getFakeCategory() {
  return {
    id: v4(),
    name: faker.animal.type() as Category,
  };
}

export function getFakeProduct(userId: string, categoryId: string, categoryName?: Category) {
  return {
    id: v4(),
    name: faker.animal[categoryName ?? getFakeCategory().name](),
    userId,
    price: faker.number.int({ min: 1_000, max: 10_000 }),
    quantityInStock: faker.number.int({ min: 1, max: 10 }),
    categoryId,
    description: faker.lorem.paragraph(),
  };
}

export async function insertCategory(...categories: ReturnType<typeof getFakeCategory>[]) {
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });
}

export async function insertProduct(...products: ReturnType<typeof getFakeProduct>[]) {
  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });
}

export const categoryOne = getFakeCategory();
export const categoryTwo = getFakeCategory();
export const categoryThree = getFakeCategory();

export const productOne = getFakeProduct(userOne.id, categoryOne.id, categoryOne.name);
export const productTwo = getFakeProduct(userOne.id, categoryOne.id, categoryOne.name);
export const productThree = getFakeProduct(userOne.id, categoryOne.id, categoryOne.name);
