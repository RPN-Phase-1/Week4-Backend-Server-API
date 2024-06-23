/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { writeFile, readFile } from 'node:fs/promises';
import { createGroupsSchema, createSchemaLinks } from './templates';

import AuthPayload from './routes/v1/auth';
import UserPayload from './routes/v1/user';
import CategoryPayload from './routes/v1/category';
import OrderPayload from './routes/v1/order';
import OrderItemPayload from './routes/v1/orderItem';

import DocsFaker from './request';

const main = async () => {
  try {
    process.stdout.write('Opening bases file\n');
    const content = await readFile('./docs/bases.md');

    process.stdout.write('Initializing request\n');
    const faker = new DocsFaker();

    await faker.deleteAll();
    await faker.insertFake(3);

    for (const schema of AuthPayload) await faker.req(schema);
    for (const schema of UserPayload) await faker.req(schema);
    for (const schema of CategoryPayload) await faker.req(schema);
    for (const schema of OrderPayload) await faker.req(schema);
    for (const schema of OrderItemPayload) await faker.req(schema);

    await faker.deleteAll();

    process.stdout.write('Creating README.md\n');
    const toWrite = content
      .toString()
      .replace('{replace:auth:routes}', createSchemaLinks(AuthPayload))
      .replace('{replace:user:routes}', createSchemaLinks(UserPayload))
      .replace('{replace:category:routes}', createSchemaLinks(CategoryPayload))
      .replace('{replace:order:routes}', createSchemaLinks(OrderPayload))
      .replace('{replace:orderItem:routes}', createSchemaLinks(OrderItemPayload))
      .replace('{replace:auth:schemas}', createGroupsSchema(AuthPayload))
      .replace('{replace:user:schemas}', createGroupsSchema(UserPayload))
      .replace('{replace:category:schemas}', createGroupsSchema(CategoryPayload))
      .replace('{replace:order:schemas}', createGroupsSchema(OrderPayload))
      .replace('{replace:orderItem:schemas}', createGroupsSchema(OrderItemPayload))
      .replace(/\{replace:responses:(.+)\}/g, (_, x) => JSON.stringify(faker.cachedResponse.get(x) || {}, null, 2));

    await writeFile('./README.md', toWrite);
    process.stdout.write('Success Creating Docs!\n');
  } catch (e) {
    process.stdout.write((e as Error).message);
  }
};

// eslint-disable-next-line no-console
main().catch(console.error);
