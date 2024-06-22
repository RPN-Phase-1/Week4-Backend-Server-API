import { writeFileSync } from 'node:fs';
import AuthPayload from './routes/v1/auth';
import { createGroupsSchema, createSchemaLinks } from './templates';

const content = `\
# inventory-sytem

${createSchemaLinks(AuthPayload)}

${createGroupsSchema(AuthPayload)}
`;

writeFileSync('./README.md', content);
