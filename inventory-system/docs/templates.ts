/* eslint-disable no-restricted-syntax */
import { AppropiateTypes, RouterSchema, RouterValue } from './payload.schema';

export function createTypeLink(value: RouterValue['type']) {
  return value instanceof Array ? value.join(', ') : `[${value}](${AppropiateTypes[value]})`;
}

export function createTableParam(values: RouterValue[]) {
  const results = [`|parameter|type|description|example|`, '|-|-|-|-|'];
  for (const value of values)
    results.push(
      `|**${value.required ? '*' : ''}${value.name}**|_${createTypeLink(value.type)}_|${value.description}|${value.example}|`
    );
  return results.join('\n');
}

export function createTableQuery(values: RouterValue[]) {
  const results = [`|query|type|description|example|`, '|-|-|-|-|'];
  for (const value of values)
    results.push(
      `|**${value.required ? '*' : ''}${value.name}**|_${createTypeLink(value.type)}_|${value.description}|${value.example}|`
    );
  return results.join('\n');
}

export function createTableBody(values: RouterValue[]) {
  const results = [`|key|type|description|`, '|-|-|-|'];
  for (const value of values)
    results.push(`|**${value.required ? '*' : ''}${value.name}**|_${createTypeLink(value.type)}_|${value.description}`);
  return results.join('\n');
}

export function createAuthorizationField(value: 'Admin' | 'User') {
  return `\`Bearer\` ${value} token`;
}

export function createJsonIfyBody(values: RouterValue[]) {
  const obj: Record<string, unknown> = {};
  for (const value of values) obj[value.name] = value.example;
  return `\`\`\`json\n${JSON.stringify(obj, null, 2)}\n\`\`\``;
}

export function createMainSchema(schema: RouterSchema) {
  const results = [`### \`${schema.method}\` ${schema.route}`, '', schema.description];
  if (schema.level) results.push('', '**Authorization**', '', createAuthorizationField(schema.level));
  if (schema.params) results.push('', '**Parameters**', '', createTableParam(schema.params));
  if (schema.queries) results.push('', '**Queries**', '', createTableQuery(schema.queries));
  if (schema.body)
    results.push('', '**Body**', '', createTableBody(schema.body), '', 'Example:', '', createJsonIfyBody(schema.body));
  results.push('', '**Responses**', '', '```json', '', `{replace:responses:${schema.method}-${schema.route}}`, '', '```');
  return results.join('\n');
}

export function createSchemaLinks(schemas: RouterSchema[]) {
  return schemas
    .map((x) => `- \`${x.method}\` [${x.route}](#${x.method}-${x.route.replaceAll('/', '').replace(':', '')})`)
    .join('\n');
}

export function createGroupsSchema(schemas: RouterSchema[]) {
  return schemas.map(createMainSchema).join('\n\n');
}
