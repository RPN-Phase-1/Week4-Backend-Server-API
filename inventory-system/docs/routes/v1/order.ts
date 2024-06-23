import prisma from '../../../src/lib/database';
import { RouterSchema } from '../../payload.schema';

export default [
  {
    route: '/v1/orders',
    method: 'GET',
    description: 'retrieve all orders data',
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
    route: '/v1/orders',
    method: 'POST',
    description: 'create order data',
    level: 'User',
    body: [
      {
        name: 'date',
        description: 'the date order created',
        type: 'isoDate',
        required: true,
        // yeah theres is javascript on this period wwkwkwk
        example: new Date(0).toISOString(),
      },
      {
        name: 'totalPrice',
        description: 'the total prices of the orders',
        type: 'float',
        required: true,
        example: 1_000_000,
      },
      {
        name: 'customerName',
        description: 'the customer who name demand to order ',
        type: 'string',
        required: true,
        example: '{replace:user:name}',
      },
      {
        name: 'customerEmail',
        description: 'the customer email who demand to order',
        type: 'string',
        required: true,
        example: '{replace:user:email}',
      },
      {
        name: 'userId',
        description: 'the user id who created the order',
        type: 'uuid',
        required: true,
        example: '{replace:user:id}',
      },
    ],
  },
  {
    route: '/v1/orders/:orderId',
    method: 'GET',
    description: 'retrieve the order data',
    level: 'User',
    params: [
      {
        name: 'orderId',
        description: 'the order id who need to retrieve their data',
        type: 'uuid',
        example: '{replace:order:id}',
      },
    ],
  },
  {
    route: '/v1/orders/:orderId',
    method: 'PUT',
    description: 'update the order data',
    level: 'User',
    params: [
      {
        name: 'orderId',
        description: 'the order id to get updated',
        type: 'uuid',
        example: () => prisma.order.findFirst({ where: { date: new Date(0) }, select: { id: true } }).then((x) => x?.id),
      },
    ],
    body: [
      {
        name: 'date',
        description: 'the date order created',
        type: 'isoDate',
        example: new Date(0).toISOString(),
      },
      {
        name: 'totalPrice',
        description: 'the total prices of the orders',
        type: 'float',
        example: 2_000_000,
      },
      {
        name: 'customerName',
        description: 'the customer who name demand to order ',
        type: 'string',
        example: '{replace:user:name}',
      },
      {
        name: 'customerEmail',
        description: 'the customer email who demand to order',
        type: 'string',
        example: '{replace:user:email}',
      },
      {
        name: 'userId',
        description: 'the user id who created the order',
        type: 'uuid',
        example: '{replace:user:id}',
      },
    ],
  },
  {
    route: '/v1/orders/:orderId',
    method: 'DELETE',
    description: 'delete the order data',
    level: 'User',
    params: [
      {
        name: 'orderId',
        description: 'the order id to get deleted',
        type: 'uuid',
        example: () => prisma.order.findFirst({ where: { date: new Date(0) }, select: { id: true } }).then((x) => x?.id),
      },
    ],
  },
] as RouterSchema[];
