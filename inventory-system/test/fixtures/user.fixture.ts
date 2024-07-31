/* eslint-disable import/no-extraneous-dependencies */
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import prisma from '../../src/lib/database';

const password = 'Passmyword123';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'User' | 'Admin';
  isEmailVerified: boolean;
}

export function createFakeUser(isAdmin = false): User {
  return {
    id: v4(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password,
    role: isAdmin ? 'Admin' : 'User',
    isEmailVerified: false,
  };
}

export const userOne = createFakeUser();
export const userTwo = createFakeUser();
export const userAdmin = createFakeUser(true);
export async function insertUsers(...users: User[]) {
  await prisma.user.createMany({
    data: users.map((x) => ({ ...x, password: hashedPassword })),
    skipDuplicates: true,
  });
}
