import { writeFileSync } from 'node:fs';
import { createGroupsSchema, createSchemaLinks } from './templates';

import AuthPayload from './routes/v1/auth';
import UserPayload from './routes/v1/user';

const content = `\
# inventory-sytem

### Authentication Routes

${createSchemaLinks(AuthPayload)}

### Users Routes

${createSchemaLinks(UserPayload)}

${createGroupsSchema(AuthPayload)}

${createGroupsSchema(UserPayload)}
`;

writeFileSync('./README.md', content);
