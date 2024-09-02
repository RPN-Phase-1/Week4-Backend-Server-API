import { RouterSchema } from '../../payload.schema';

export default [
  {
    route: '/v1/auth/register',
    method: 'POST',
    description: 'to register so we can use login',
    body: [
      {
        name: 'email',
        type: 'string',
        description: 'an user email',
        example: 'rakemoon@super.ma.il',
        required: true,
      },
      {
        name: 'password',
        type: 'string',
        description: 'a user password',
        example: '@4kuW1bu',
        required: true,
      },
      {
        name: 'name',
        type: 'string',
        description: 'a fantastic name of your',
        example: 'ImRakemoon',
        required: true,
      },
      {
        name: 'role',
        type: ['Admin', 'User'],
        description: 'an user role',
        example: 'Admin',
      },
    ],
  },
  {
    route: '/v1/auth/login',
    method: 'POST',
    description: 'to login and get tokens for accessing another api endpoint',
    body: [
      {
        name: 'email',
        type: 'string',
        description: 'an user email',
        example: 'rakemoon@super.ma.il',
        required: true,
      },
      {
        name: 'password',
        type: 'string',
        description: 'an user password',
        example: '@4kuW1bu',
        required: true,
      },
    ],
  },
  {
    route: '/v1/auth/logout',
    method: 'POST',
    description: 'to logout of course',
    body: [
      {
        name: 'email',
        type: 'string',
        description: 'an user email',
        example: 'rakemoon@super.ma.il',
        required: true,
      },
    ],
  },
] as RouterSchema[];
