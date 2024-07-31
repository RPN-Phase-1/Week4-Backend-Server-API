import { RouterSchema } from '../../payload.schema';

export default [
  {
    route: '/v1/order-items',
    method: 'GET',
    description: 'retrieve all order items data',
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
    route: '/v1/order-items',
    method: 'POST',
    description: 'create order item data',
    level: 'User',
    body: [
      {
        name: 'quantity',
        description: 'the items quantity to get ordered',
        type: 'integer',
        example: 1,
        required: true,
      },
      {
        name: 'unitPrice',
        description: 'the item prices',
        type: 'float',
        example: 1_000_000,
        required: true,
      },
      {
        name: 'orderId',
        description: 'the order id belong for this item',
        type: 'uuid',
        example: '{replace:order:id}',
        required: true,
      },
      {
        name: 'productId',
        description: 'the product id belong for this item',
        type: 'uuid',
        example: '{replace:product:id}',
        required: true,
      },
    ],
  },
  {
    route: '/v1/order-items/:orderItemId',
    method: 'GET',
    description: 'get order item data',
    level: 'User',
    params: [
      {
        name: 'orderItemId',
        description: 'the order item id who need to get retrieved',
        type: 'uuid',
        example: '{replace:orderItem:id}',
      },
    ],
  },
  {
    route: '/v1/order-items/:orderItemId',
    method: 'PUT',
    description: 'update order items',
    level: 'User',
    params: [
      {
        name: 'orderItemId',
        description: 'the order item id who need get updated',
        type: 'uuid',
        example: '{replace:orderItem:id}',
      },
    ],
    body: [
      {
        name: 'quantity',
        description: 'the items quantity to get ordered',
        type: 'integer',
        example: 1,
        required: true,
      },
      {
        name: 'unitPrice',
        description: 'the item prices',
        type: 'float',
        example: 2_000_000,
        required: true,
      },
      {
        name: 'orderId',
        description: 'the order id belong for this item',
        type: 'uuid',
        example: '{replace:order:id}',
        required: true,
      },
      {
        name: 'productId',
        description: 'the product id belong for this item',
        type: 'uuid',
        example: '{replace:product:id}',
        required: true,
      },
    ],
  },
  {
    route: '/v1/order-items/:orderItemId',
    method: 'DELETE',
    description: 'delete order item',
    level: 'User',
    params: [
      {
        name: 'orderItemId',
        description: 'the order item id who need to get deleted',
        type: 'uuid',
        example: '{replace:orderItem:id}',
      },
    ],
  },
] as RouterSchema[];
