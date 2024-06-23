import { writeFileSync, readFileSync } from 'node:fs';
import { createGroupsSchema, createSchemaLinks } from './templates';

import AuthPayload from './routes/v1/auth';
import UserPayload from './routes/v1/user';

try {
  process.stdout.write('Opening bases file\n');
  const content = readFileSync('./docs/bases.md');

  process.stdout.write('Creating README.md\n');
  const toWrite = content
    .toString()
    .replace('{replace:auth:routes}', createSchemaLinks(AuthPayload))
    .replace('{replace:user:routes}', createSchemaLinks(UserPayload))
    .replace('{replace:auth:schemas}', createGroupsSchema(AuthPayload))
    .replace('{replace:user:schemas}', createGroupsSchema(UserPayload));

  writeFileSync('./README.md', toWrite);
  process.stdout.write('Success Creating Docs!\n');
} catch (e) {
  process.stdout.write((e as Error).message);
}
