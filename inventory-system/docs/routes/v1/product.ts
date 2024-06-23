import prisma from '../../../src/lib/database';
import { RouterSchema } from '../../payload.schema';

export default [
  {
    route: '/v1/products',
    method: 'GET',
    description: 'retrieve all products data',
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
    route: '/v1/products',
    method: 'POST',
    description: 'to create products data',
    level: 'User',
    body: [
      {
        name: 'name',
        type: 'string',
        description: 'the name of the product',
        required: true,
        example: 'Aloha',
      },
      {
        name: 'price',
        type: 'float',
        description: 'the price of the product',
        required: true,
        example: 1_000,
      },
      {
        name: 'description',
        type: 'string',
        description: 'the description of the product',
        required: true,
        example: 'This is a brand new aloe verra with durian scene',
      },
      {
        name: 'quantityStock',
        type: 'integer',
        description: 'the quantity of the products',
        required: true,
        example: 10,
      },
      {
        name: 'userId',
        type: 'uuid',
        description: 'the user id who create this product',
        required: true,
        example: '{replace:user:id}',
      },
      {
        name: 'categoryId',
        type: 'uuid',
        description: 'the category id for this product',
        required: true,
        example: '{replace:category:id}',
      },
    ],
  },
  {
    route: '/v1/products/:productId',
    method: 'GET',
    description: 'to retrieve product data',
    level: 'User',
    params: [
      {
        name: 'productId',
        type: 'uuid',
        description: 'the product id who need to retrieve their data',
        required: true,
        example: '{replace:product:id}',
      },
    ],
  },
  {
    route: '/v1/products/:productId',
    method: 'PUT',
    description: 'to edit product data',
    level: 'User',
    params: [
      {
        name: 'productId',
        type: 'uuid',
        description: 'the product id to update the data',
        required: true,
        example: () => prisma.product.findFirst({ where: { name: 'Aloha' }, select: { id: true } }).then((x) => x?.id),
      },
    ],
    body: [
      {
        name: 'name',
        type: 'string',
        description: 'the name of the product',
        example: 'BaiLoha',
      },
      {
        name: 'price',
        type: 'float',
        description: 'the price of the product',
        example: 1_000,
      },
      {
        name: 'description',
        type: 'string',
        description: 'the description of the product',
        example: 'This is a brand new aloe verra with durian scene',
      },
      {
        name: 'quantityStock',
        type: 'integer',
        description: 'the quantity of the products',
        example: 10,
      },
      {
        name: 'userId',
        type: 'uuid',
        description: 'the user id who create this product',
        example: '{replace:user:id}',
      },
      {
        name: 'categoryId',
        type: 'uuid',
        description: 'the category id for this product',
        example: '{replace:category:id}',
      },
    ],
  },
  {
    route: '/v1/products/:productId',
    method: 'DELETE',
    description: 'to delete product data',
    level: 'User',
    params: [
      {
        name: 'productId',
        type: 'uuid',
        description: 'the product id who to delete',
        required: true,
        example: '{replace:product:id}',
      },
    ],
  },
  {
    route: '/v1/products/search',
    method: 'GET',
    description: 'to search product by category',
    level: 'User',
    queries: [
      {
        name: 'category',
        type: 'string',
        description: 'the name of category',
        required: true,
        example: '{replace:category:name}',
      },
    ],
  },
] as RouterSchema[];
