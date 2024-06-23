import prisma from '../../../src/lib/database';
import { RouterSchema } from '../../payload.schema';

export default [
  {
    route: '/v1/users',
    method: 'GET',
    description: 'retrieve all users data',
    level: 'Admin',
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
    route: '/v1/users',
    method: 'POST',
    description: 'create user data',
    level: 'Admin',
    body: [
      {
        name: 'name',
        description: 'the name of user',
        type: 'string',
        example: 'hantuKiyowo',
        required: true,
      },
      {
        name: 'email',
        description: 'the email of the user',
        type: 'string',
        example: 'hantu@kiyowo.co.uk',
        required: true,
      },
      {
        name: 'password',
        description: 'the password of the user',
        type: 'string',
        example: 'hantuK1y0w0@',
        required: true,
      },
      {
        name: 'role',
        description: 'the role of the user',
        type: ['User', 'Admin'],
        example: 'User',
      },
      {
        name: 'isEmailVerified',
        description: 'is user email verified ?',
        type: 'boolean',
        example: false,
      },
    ],
  },
  {
    route: '/v1/users/:userId',
    method: 'GET',
    description: 'retrieve user data',
    level: 'Admin',
    params: [
      {
        name: 'userId',
        description: 'an user id who need to retrieve',
        type: 'uuid',
        example: '{replace:user:id}',
      },
    ],
  },
  {
    route: '/v1/users/:userId',
    method: 'PUT',
    description: 'update user data',
    level: 'Admin',
    params: [
      {
        name: 'userId',
        description: 'an user id who will get the data update',
        type: 'uuid',
        example: () => prisma.user.findFirst({ where: { name: 'hantuKiyowo' }, select: { id: true } }).then((x) => x?.id),
      },
    ],
    body: [
      {
        name: 'name',
        description: 'the name of user',
        type: 'string',
        example: 'bakYusa',
      },
      {
        name: 'email',
        description: 'the email of the user',
        type: 'string',
        example: 'bakbibuk@strip.email',
      },
      {
        name: 'password',
        description: 'the password of the user',
        type: 'string',
        example: ',bakYus@123',
      },
      {
        name: 'role',
        description: 'the role of the user',
        type: ['User', 'Admin'],
        example: 'User',
      },
      {
        name: 'isEmailVerified',
        description: 'is user email verified ?',
        type: 'boolean',
        example: false,
      },
    ],
  },
  {
    route: '/v1/users/:userId',
    method: 'DELETE',
    description: 'delete user data',
    level: 'Admin',
    params: [
      {
        name: 'userId',
        description: 'an user id who will get deleted',
        type: 'uuid',
        example: () => prisma.user.findFirst({ where: { name: 'bakYusa' }, select: { id: true } }).then((x) => x?.id),
      },
    ],
  },
] as RouterSchema[];
