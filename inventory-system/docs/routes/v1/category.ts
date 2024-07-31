import prisma from '../../../src/lib/database';
import { RouterSchema } from '../../payload.schema';

export default [
  {
    route: '/v1/categories',
    method: 'GET',
    description: 'retrieve all categories data',
    level: 'User',
    queries: [
      {
        name: 'pageIndex',
        description: 'the index of current pages',
        type: 'integer',
        example: 1,
        required: true,
      },
      {
        name: 'pageSize',
        description: 'the document limit for every pages',
        type: 'integer',
        example: 10,
        required: true,
      },
    ],
  },
  {
    route: '/v1/categories',
    method: 'POST',
    description: 'to create new categories',
    level: 'User',
    body: [
      {
        name: 'name',
        type: 'string',
        description: 'the name of category',
        example: 'Opopipipar',
        required: true,
      },
    ],
  },
  {
    route: '/v1/categories/:categoryId',
    method: 'GET',
    description: 'to retrive existing category',
    level: 'User',
    params: [
      {
        name: 'categoryId',
        type: 'uuid',
        description: 'the id of category to retrieve',
        required: true,
        example: '{replace:category:id}',
      },
    ],
  },
  {
    route: '/v1/categories/:categoryId',
    method: 'PUT',
    description: 'to edit existing category',
    level: 'User',
    params: [
      {
        name: 'categoryId',
        type: 'uuid',
        description: 'the id of category to edit',
        required: true,
        example: () => prisma.category.findFirst({ where: { name: 'Opopipipar' }, select: { id: true } }).then((x) => x?.id),
      },
    ],
    body: [
      {
        name: 'name',
        type: 'string',
        description: 'the name of category',
        example: 'Osupipipar',
        required: true,
      },
    ],
  },
  {
    route: '/v1/categories/:categoryId',
    method: 'DELETE',
    description: 'to delete existing category',
    level: 'User',
    params: [
      {
        name: 'categoryId',
        type: 'uuid',
        description: 'the id of category to delete',
        required: true,
        example: () => prisma.category.findFirst({ where: { name: 'Osupipipar' }, select: { id: true } }).then((x) => x?.id),
      },
    ],
  },
] as RouterSchema[];
