import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

jest.mock('./src/lib/database.ts', () => {
  const generatedDatabaseURL = () => {
    if (!process.env.DATABASE_URL) throw new Error('Please Provide Database URL');
    return process.env.DATABASE_URL.replace('/railway', '/testingDB');
  };

  const prismaBinary = join(__dirname, './node_modules/.bin/prisma');

  const prisma = new PrismaClient({ datasources: { db: { url: generatedDatabaseURL() } } });

  beforeAll(() => {
    execSync(`${prismaBinary} db push`, {
      env: {
        ...process.env,
        DATABASE_URL: generatedDatabaseURL(),
      },
    });
  });

  beforeEach(async () => {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    await prisma.token.deleteMany();
  });

  afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS testingDB`);
    await prisma.$disconnect();
  });

  return {
    __esModule: true,
    default: prisma,
  };
});
