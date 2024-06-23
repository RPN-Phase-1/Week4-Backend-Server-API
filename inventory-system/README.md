# inventory-system

A phase1 week4 long run projects on RPN.

## Table of Contents

- [Features](#Features)
- [Environment Variables](#EnvironmentVariables)
- [Api Endpoints](#ApiEndpoints)

## Features

- **Database**: relational database using [prisma](https://github.com/prisma/prisma) & [mysql](https://github.com/mysqljs/mysql)
- **Authentication and Authorization**: using [passport](https://github.com/jaredhanson/passport)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error Handling**: centralized error handling mechanism
- **Api Documentation**: using [docs](https://github.com/Rakemoon/tree/adzikri/docs/parser.ts)
- **Process Management**: using [pm2](https://pm2.keymetrics.io/)
- **Dependency Management**: using [pnpm](https://github.com/pnpm/pnpm)
- **Environment Variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env)
- **Security**: set security http headers using [helmet](https://helmetjs.github.io/)
- **Sanitizing**: sanitize request data against [xss](https://www.npmjs.com/package/xss-clean)
- **CORS**: enabled using [cors](https://github.com/expressjs/cors)

## Environment Variables

Example:
```env
# The database URL
DATABASE_URL="mysql://localhost:8181/exampleDB"

# The app port
PORT=8080

# Json Web Token (JWT)
# a secret
JWT_SECRET=thisisasamplesecret
# the expiration token times in minutes
JWT_ACCESS_EXPIRATION_MINUTES=30
# the expiration times for refresh tokens in days
JWT_REFRESH_EXPIRATION_DAYS=30
```

## Api Documentation

**Auth Routes**:

- `POST` [/v1/auth/register](#POST-v1authregister)
- `POST` [/v1/auth/login](#POST-v1authlogin)
- `POST` [/v1/auth/logout](#POST-v1authlogout)

**User Routes**:

- `GET` [/v1/users](#GET-v1users)
- `POST` [/v1/users](#POST-v1users)
- `GET` [/v1/users/:userId](#GET-v1users:userId)
- `PUT` [/v1/users/:userId](#PUT-v1users:userId)
- `DELETE` [/v1/users/:userId](#DELETE-v1users:userId)

### `POST` /v1/auth/register

to register so we can use login

**Body**

|key|type|description|
|-|-|-|
|***email**|_string_|an user email
|***password**|_string_|a user password
|***name**|_string_|a fantastic name of your
|**role**|_Admin, User_|an user role

Example:

```json
{
  "email": "rakemoon@super.ma.il",
  "password": "@4kuW1bu",
  "name": "ImRakemoon",
  "role": "Admin"
}
```

### `POST` /v1/auth/login

to login and get tokens for accessing another api endpoint

**Body**

|key|type|description|
|-|-|-|
|***email**|_string_|an user email
|***password**|_string_|an user password

Example:

```json
{
  "email": "rakemoon@super.ma.il",
  "password": "@4kuW1bu"
}
```

### `POST` /v1/auth/logout

to logout of course

**Body**

|key|type|description|
|-|-|-|
|***email**|_string_|an user email

Example:

```json
{
  "email": "rakemoon@super.ma.il"
}
```

### `GET` /v1/users

retrieve all users data

**Queries**

|query|type|description|example|
|-|-|-|-|
|***pageIndex**|_number_|the index of current pages|1|
|***pageSize**|_number_|the document limit for every pages|10|

### `POST` /v1/users

create user data

**Body**

|key|type|description|
|-|-|-|
|***name**|_string_|the name of user
|***email**|_string_|the email of the user
|***password**|_string_|the password of the user
|**role**|_User, Admin_|the role of the user
|**isEmailVerified**|_boolean_|is user email verified ?

Example:

```json
{
  "name": "hantuKiyowo",
  "email": "hantu@kiyowo.co.uk",
  "password": "hantuK1y0w0@",
  "role": "User",
  "isEmailVerified": false
}
```

### `GET` /v1/users/:userId

retrieve user data

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_uuid_|an user id who need to retrieve|{uuid}|

### `PUT` /v1/users/:userId

update user data

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_uuid_|an user id who will get the data update|{uuid}|

**Body**

|key|type|description|
|-|-|-|
|**name**|_string_|the name of user
|**email**|_string_|the email of the user
|**password**|_string_|the password of the user
|**role**|_User, Admin_|the role of the user
|**isEmailVerified**|_boolean_|is user email verified ?

Example:

```json
{
  "name": "hantuKiyowo",
  "email": "hantu@kiyowo.co.uk",
  "password": "hantuK1y0w0@",
  "role": "User",
  "isEmailVerified": false
}
```

### `DELETE` /v1/users/:userId

delete user data

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_uuid_|an user id who will get deleted|{uuid}|
