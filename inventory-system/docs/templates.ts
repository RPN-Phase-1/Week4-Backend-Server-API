/* eslint-disable no-restricted-syntax */
import { RouterSchema, RouterValue } from './payload.schema';

export function createTableParam(values: RouterValue[]) {
  const results = [`|parameter|type|description|example|`, '|-|-|-|-|'];
  for (const value of values)
    results.push(
      `|**${value.required ? '*' : ''}${value.name}**|_${
        value.type instanceof Array ? value.type.join(', ') : value.type
      }_|${value.description}|${value.example}|`
    );
  return results.join('\n');
}

export function createTableQuery(values: RouterValue[]) {
  const results = [`|query|type|description|example|`, '|-|-|-|-|'];
  for (const value of values)
    results.push(
      `|**${value.required ? '*' : ''}${value.name}**|_${
        value.type instanceof Array ? value.type.join(', ') : value.type
      }_|${value.description}|${value.example}|`
    );
  return results.join('\n');
}

export function createTableBody(values: RouterValue[]) {
  const results = [`|key|type|description|`, '|-|-|-|'];
  for (const value of values)
    results.push(
      `|**${value.required ? '*' : ''}${value.name}**|_${
        value.type instanceof Array ? value.type.join(', ') : value.type
      }_|${value.description}`
    );
  return results.join('\n');
}

export function createJsonIfyBody(values: RouterValue[]) {
  const obj: Record<string, unknown> = {};
  for (const value of values) obj[value.name] = value.example;
  return `\`\`\`json\n${JSON.stringify(obj, null, 2)}\n\`\`\``;
}

export function createMainSchema(schema: RouterSchema) {
  const results = [`### \`${schema.method}\` ${schema.route}`, '', schema.description];
  if (schema.params) results.push('', '**Parameters**', '', createTableParam(schema.params));
  if (schema.queries) results.push('', '**Queries**', '', createTableQuery(schema.queries));
  if (schema.body)
    results.push('', '**Body**', '', createTableBody(schema.body), '', 'Example:', '', createJsonIfyBody(schema.body));
  return results.join('\n');
}

export function createSchemaLinks(schemas: RouterSchema[]) {
  return schemas.map((x) => `- \`${x.method}\` [${x.route}](#${x.method}-${x.route.replaceAll('/', '')})`).join('\n');
}

export function createGroupsSchema(schemas: RouterSchema[]) {
  return schemas.map(createMainSchema).join('\n\n');
}
