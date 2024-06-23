/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { writeFile, readFile } from 'node:fs/promises';
import { createGroupsSchema, createSchemaLinks } from './templates';

import AuthPayload from './routes/v1/auth';
import UserPayload from './routes/v1/user';
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

    await faker.deleteAll();

    process.stdout.write('Creating README.md\n');
    const toWrite = content
      .toString()
      .replace('{replace:auth:routes}', createSchemaLinks(AuthPayload))
      .replace('{replace:user:routes}', createSchemaLinks(UserPayload))
      .replace('{replace:auth:schemas}', createGroupsSchema(AuthPayload))
      .replace('{replace:user:schemas}', createGroupsSchema(UserPayload))
      .replace(/\{replace:responses:(.+)\}/g, (_, x) => JSON.stringify(faker.cachedResponse.get(x) || {}, null, 2));

    await writeFile('./README.md', toWrite);
    process.stdout.write('Success Creating Docs!\n');
  } catch (e) {
    process.stdout.write((e as Error).message);
  }
};

// eslint-disable-next-line no-console
main().catch(console.error);
