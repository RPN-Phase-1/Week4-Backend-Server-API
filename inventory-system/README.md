# inventory-system

An inventory management system app using express
that based on rpn phase1 week4 long run project

## Table of Contents

- [Features](#Features)
- [Project Structure](#ProjectStructure)
- [Environment Variables](#EnvironmentVariables)
- [Api Documentation](#ApiDocumentation)

## Features

- **Database**: relational database using [prisma](https://github.com/prisma/prisma) & [mysql](https://github.com/mysqljs/mysql)
- **Authentication and Authorization**: using [passport](https://github.com/jaredhanson/passport)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error Handling**: centralized error handling mechanism
- **Api Documentation**: using [docs](https://github.com/Rakemoon/Week4-Backend-Server-API/blob/adzikri/inventory-system/docs/parser.ts)
- **Process Management**: using [pm2](https://pm2.keymetrics.io/)
- **Dependency Management**: using [pnpm](https://github.com/pnpm/pnpm)
- **Environment Variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env)
- **Security**: set security http headers using [helmet](https://helmetjs.github.io/)
- **Sanitizing**: sanitize request data against [xss](https://www.npmjs.com/package/xss-clean)
- **CORS**: enabled using [cors](https://github.com/expressjs/cors)

## Project Structure

```ls
src\
 | -- config\               # Environment Variables and config related things
 | -- routes\               # Routes Controller layers
 | -- services\             # Service Layers
 | -- lib\
       | -- middlewares\    # The collection of custom middlewares
       | -- models\         # The collection of abstract classes
       | -- utils\          # The collection of utility things
       | -- validations\    # The collections of request data validations
```

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
- `GET` [/v1/users/:userId](#GET-v1usersuserId)
- `PUT` [/v1/users/:userId](#PUT-v1usersuserId)
- `DELETE` [/v1/users/:userId](#DELETE-v1usersuserId)
- `GET` [/v1/users/:userId/products](#GET-v1usersuserIdproducts)
- `GET` [/v1/users/:userId/orders](#GET-v1usersuserIdorders)

**Category Routes**:

- `GET` [/v1/categories](#GET-v1categories)
- `POST` [/v1/categories](#POST-v1categories)
- `GET` [/v1/categories/:categoryId](#GET-v1categoriescategoryId)
- `PUT` [/v1/categories/:categoryId](#PUT-v1categoriescategoryId)
- `DELETE` [/v1/categories/:categoryId](#DELETE-v1categoriescategoryId)

**Order Routes**:

- `GET` [/v1/orders](#GET-v1orders)
- `POST` [/v1/orders](#POST-v1orders)
- `GET` [/v1/orders/:orderId](#GET-v1ordersorderId)
- `PUT` [/v1/orders/:orderId](#PUT-v1ordersorderId)
- `DELETE` [/v1/orders/:orderId](#DELETE-v1ordersorderId)

**Order Items**:

- `GET` [/v1/order-items](#GET-v1order-items)
- `POST` [/v1/order-items](#POST-v1order-items)
- `GET` [/v1/order-items/:orderItemId](#GET-v1order-itemsorderItemId)
- `PUT` [/v1/order-items/:orderItemId](#PUT-v1order-itemsorderItemId)
- `DELETE` [/v1/order-items/:orderItemId](#DELETE-v1order-itemsorderItemId)

## Api Endpoints

### `POST` /v1/auth/register

to register so we can use login

**Body**

|key|type|description|
|-|-|-|
|***email**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|an user email
|***password**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|a user password
|***name**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|a fantastic name of your
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

**Responses**

```json

{
  "code": 201,
  "message": "User Created!",
  "data": {
    "user": {
      "id": "db008c57-bed5-41f5-b0a5-35362456ff58",
      "name": "ImRakemoon",
      "email": "rakemoon@super.ma.il",
      "password": "$2a$08$y1vAStWgO/8fTuzzpTSSbuk5WnRF6PfRglzeeEclCKfymBOjiklKi",
      "role": "Admin",
      "createdAt": "2024-06-23T10:57:42.246Z",
      "updatedAt": "2024-06-23T10:57:42.246Z",
      "isEmailVerified": false
    },
    "tokens": {
      "access": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYjAwOGM1Ny1iZWQ1LTQxZjUtYjBhNS0zNTM2MjQ1NmZmNTgiLCJpYXQiOjE3MTkxNDAyNjMsImV4cCI6MTcxOTE0MjA2MywidHlwZSI6ImFjY2VzcyJ9.Y1DvZ2twKlGMm2UFWeduCsRirvI8fampBFprmn31XBk",
        "expires": "2024-06-23T11:27:43.518Z"
      },
      "refresh": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYjAwOGM1Ny1iZWQ1LTQxZjUtYjBhNS0zNTM2MjQ1NmZmNTgiLCJpYXQiOjE3MTkxNDAyNjMsImV4cCI6MTcyMTczMjI2MywidHlwZSI6InJlZnJlc2gifQ.3wW_06ivBqg8AjDEB_xgxYfSESTG3sI8VjinxVTax58",
        "expires": "2024-07-23T10:57:43.522Z"
      }
    }
  }
}

```

### `POST` /v1/auth/login

to login and get tokens for accessing another api endpoint

**Body**

|key|type|description|
|-|-|-|
|***email**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|an user email
|***password**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|an user password

Example:

```json
{
  "email": "rakemoon@super.ma.il",
  "password": "@4kuW1bu"
}
```

**Responses**

```json

{
  "code": 200,
  "message": "User Login!",
  "data": {
    "user": {
      "id": "db008c57-bed5-41f5-b0a5-35362456ff58",
      "name": "ImRakemoon",
      "email": "rakemoon@super.ma.il",
      "password": "$2a$08$y1vAStWgO/8fTuzzpTSSbuk5WnRF6PfRglzeeEclCKfymBOjiklKi",
      "role": "Admin",
      "createdAt": "2024-06-23T10:57:42.246Z",
      "updatedAt": "2024-06-23T10:57:42.246Z",
      "isEmailVerified": false
    },
    "tokens": {
      "access": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYjAwOGM1Ny1iZWQ1LTQxZjUtYjBhNS0zNTM2MjQ1NmZmNTgiLCJpYXQiOjE3MTkxNDAyNjUsImV4cCI6MTcxOTE0MjA2NSwidHlwZSI6ImFjY2VzcyJ9.lKW4dJmowPwcjW17wpH-sGUuS2TQ_pIvk1898N3jHDg",
        "expires": "2024-06-23T11:27:45.004Z"
      },
      "refresh": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYjAwOGM1Ny1iZWQ1LTQxZjUtYjBhNS0zNTM2MjQ1NmZmNTgiLCJpYXQiOjE3MTkxNDAyNjUsImV4cCI6MTcyMTczMjI2NSwidHlwZSI6InJlZnJlc2gifQ.HPwHKj8jFA2AJvcauowLdAVdffYeMIVdC5tpQU72YwA",
        "expires": "2024-07-23T10:57:45.004Z"
      }
    }
  }
}

```

### `POST` /v1/auth/logout

to logout of course

**Body**

|key|type|description|
|-|-|-|
|***email**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|an user email

Example:

```json
{
  "email": "rakemoon@super.ma.il"
}
```

**Responses**

```json

{
  "code": 200,
  "message": "User Logout",
  "data": {}
}

```

### `GET` /v1/users

retrieve all users data

**Authorization**

`Bearer` Admin token

**Queries**

|query|type|description|example|
|-|-|-|-|
|***pageIndex**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the index of current pages|1|
|***pageSize**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the document limit for every pages|10|

**Responses**

```json

{
  "code": 200,
  "message": "Users retrieved!",
  "data": {
    "index": 1,
    "numOfPages": 1,
    "datas": [
      {
        "id": "29c37af7-a74a-4af8-a681-ef3cffc59fa5",
        "name": "Claude Littel",
        "email": "violette.littel@hotmail.com",
        "password": "$2a$08$mfwndWFfU7pR5fhppRTVju2FF3a3uHj6dZnrqx4rQBWiXMnTRQZHW",
        "role": "Admin",
        "createdAt": "2024-06-23T10:57:37.594Z",
        "updatedAt": "2024-06-23T10:57:37.594Z",
        "isEmailVerified": false
      },
      {
        "id": "6033b295-78cd-4c04-9f29-d1b0c4688547",
        "name": "Debbie Brown",
        "email": "estel.rohan14@gmail.com",
        "password": "$2a$08$mfwndWFfU7pR5fhppRTVju2FF3a3uHj6dZnrqx4rQBWiXMnTRQZHW",
        "role": "User",
        "createdAt": "2024-06-23T10:57:37.594Z",
        "updatedAt": "2024-06-23T10:57:37.594Z",
        "isEmailVerified": false
      },
      {
        "id": "71458d15-48a0-4d77-a5cd-632b31e31713",
        "name": "Karl Wehner",
        "email": "letitia86@hotmail.com",
        "password": "$2a$08$mfwndWFfU7pR5fhppRTVju2FF3a3uHj6dZnrqx4rQBWiXMnTRQZHW",
        "role": "User",
        "createdAt": "2024-06-23T10:57:37.594Z",
        "updatedAt": "2024-06-23T10:57:37.594Z",
        "isEmailVerified": false
      },
      {
        "id": "db008c57-bed5-41f5-b0a5-35362456ff58",
        "name": "ImRakemoon",
        "email": "rakemoon@super.ma.il",
        "password": "$2a$08$y1vAStWgO/8fTuzzpTSSbuk5WnRF6PfRglzeeEclCKfymBOjiklKi",
        "role": "Admin",
        "createdAt": "2024-06-23T10:57:42.246Z",
        "updatedAt": "2024-06-23T10:57:42.246Z",
        "isEmailVerified": false
      },
      {
        "id": "db9f3ab3-e675-4848-97f1-e3dc2553d232",
        "name": "Dawn Kling",
        "email": "adriana.johnston23@yahoo.com",
        "password": "$2a$08$mfwndWFfU7pR5fhppRTVju2FF3a3uHj6dZnrqx4rQBWiXMnTRQZHW",
        "role": "User",
        "createdAt": "2024-06-23T10:57:37.594Z",
        "updatedAt": "2024-06-23T10:57:37.594Z",
        "isEmailVerified": false
      }
    ]
  }
}

```

### `POST` /v1/users

create user data

**Authorization**

`Bearer` Admin token

**Body**

|key|type|description|
|-|-|-|
|***name**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the name of user
|***email**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the email of the user
|***password**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the password of the user
|**role**|_User, Admin_|the role of the user
|**isEmailVerified**|_[boolean](undefined)_|is user email verified ?

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

**Responses**

```json

{
  "code": 201,
  "message": "User succesfully created",
  "data": {
    "id": "1bc7427a-7334-466f-b05f-9390cee3a789",
    "name": "hantuKiyowo",
    "email": "hantu@kiyowo.co.uk",
    "password": "$2a$08$LxSHfzt2PB7EL1hkOFerze7xkmYnYe9eEk022M1QghygWJ6pKKD6e",
    "role": "User",
    "createdAt": "2024-06-23T10:57:47.662Z",
    "updatedAt": "2024-06-23T10:57:47.662Z",
    "isEmailVerified": false
  }
}

```

### `GET` /v1/users/:userId

retrieve user data

**Authorization**

`Bearer` Admin token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who need to retrieve|6033b295-78cd-4c04-9f29-d1b0c4688547|

**Responses**

```json

{
  "code": 200,
  "message": "User succesfully retrieved!",
  "data": {
    "id": "6033b295-78cd-4c04-9f29-d1b0c4688547",
    "name": "Debbie Brown",
    "email": "estel.rohan14@gmail.com",
    "password": "$2a$08$mfwndWFfU7pR5fhppRTVju2FF3a3uHj6dZnrqx4rQBWiXMnTRQZHW",
    "role": "User",
    "createdAt": "2024-06-23T10:57:37.594Z",
    "updatedAt": "2024-06-23T10:57:37.594Z",
    "isEmailVerified": false
  }
}

```

### `PUT` /v1/users/:userId

update user data

**Authorization**

`Bearer` Admin token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who will get the data update|1bc7427a-7334-466f-b05f-9390cee3a789|

**Body**

|key|type|description|
|-|-|-|
|**name**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the name of user
|**email**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the email of the user
|**password**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the password of the user
|**role**|_User, Admin_|the role of the user
|**isEmailVerified**|_[boolean](undefined)_|is user email verified ?

Example:

```json
{
  "name": "bakYusa",
  "email": "bakbibuk@strip.email",
  "password": ",bakYus@123",
  "role": "User",
  "isEmailVerified": false
}
```

**Responses**

```json

{
  "code": 200,
  "message": "Succesfully update user!",
  "data": {
    "id": "1bc7427a-7334-466f-b05f-9390cee3a789",
    "name": "bakYusa",
    "email": "bakbibuk@strip.email",
    "password": "$2a$08$pfeqEuoy6tGOFlwhBpfMJuXIri2mtseIVsLiGugtRNZxs23Z3K/LC",
    "role": "User",
    "createdAt": "2024-06-23T10:57:47.662Z",
    "updatedAt": "2024-06-23T10:57:49.762Z",
    "isEmailVerified": false
  }
}

```

### `DELETE` /v1/users/:userId

delete user data

**Authorization**

`Bearer` Admin token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who will get deleted|1bc7427a-7334-466f-b05f-9390cee3a789|

**Responses**

```json

{
  "code": 200,
  "message": "Succesfully delete user!",
  "data": {
    "id": "1bc7427a-7334-466f-b05f-9390cee3a789",
    "name": "bakYusa",
    "email": "bakbibuk@strip.email",
    "password": "$2a$08$pfeqEuoy6tGOFlwhBpfMJuXIri2mtseIVsLiGugtRNZxs23Z3K/LC",
    "role": "User",
    "createdAt": "2024-06-23T10:57:47.662Z",
    "updatedAt": "2024-06-23T10:57:49.762Z",
    "isEmailVerified": false
  }
}

```

### `GET` /v1/users/:userId/products



**Authorization**

`Bearer` Admin token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who need to retrive products data|6033b295-78cd-4c04-9f29-d1b0c4688547|

**Responses**

```json

{
  "code": 200,
  "message": "Products Succesfully retrieved!",
  "data": [
    {
      "id": "4b392050-ef43-4f03-8f0e-0f34ef8c4ce3",
      "name": "Canebrake",
      "description": "Solio cras avaritia absens sumo vix. Amita aequitas tabgo creator conduco dolorum crebro ea modi surgo. Sufficio vomica inventore velit cibus.",
      "price": 7945,
      "quantityInStock": 9,
      "categoryId": "ba60fcb0-85bd-4c21-827c-77aa8e78e5ab",
      "userId": "6033b295-78cd-4c04-9f29-d1b0c4688547",
      "createdAt": "2024-06-23T10:57:39.140Z",
      "updatedAt": "2024-06-23T10:57:39.140Z"
    }
  ]
}

```

### `GET` /v1/users/:userId/orders



**Authorization**

`Bearer` Admin token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who need to retrive orders data|6033b295-78cd-4c04-9f29-d1b0c4688547|

**Responses**

```json

{
  "code": 200,
  "message": "Orders Succesfully retrieved!",
  "data": [
    {
      "id": "467c62fd-440c-4f3b-b61e-4309eecc435b",
      "date": "2024-06-23T10:57:39.137Z",
      "totalPrice": 37206,
      "customerName": "Debbie Brown",
      "customerEmail": "estel.rohan14@gmail.com",
      "userId": "6033b295-78cd-4c04-9f29-d1b0c4688547",
      "createdAt": "2024-06-23T10:57:39.140Z",
      "updatedAt": "2024-06-23T10:57:39.140Z"
    }
  ]
}

```

### `GET` /v1/categories

retrieve all categories data

**Authorization**

`Bearer` User token

**Queries**

|query|type|description|example|
|-|-|-|-|
|***pageIndex**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the index of current pages|1|
|***pageSize**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the document limit for every pages|10|

**Responses**

```json

{
  "code": 200,
  "message": "Category retrieved!",
  "data": {
    "index": 1,
    "numOfPages": 1,
    "datas": [
      {
        "id": "97df82cc-fb0a-4849-9a12-d5e513c970d3",
        "name": "fish",
        "createdAt": "2024-06-23T10:57:37.594Z",
        "updatedAt": "2024-06-23T10:57:37.594Z"
      },
      {
        "id": "ba60fcb0-85bd-4c21-827c-77aa8e78e5ab",
        "name": "snake",
        "createdAt": "2024-06-23T10:57:37.594Z",
        "updatedAt": "2024-06-23T10:57:37.594Z"
      },
      {
        "id": "e714f42c-28d3-4b5f-8353-f301601cdf90",
        "name": "rabbit",
        "createdAt": "2024-06-23T10:57:37.594Z",
        "updatedAt": "2024-06-23T10:57:37.594Z"
      }
    ]
  }
}

```

### `POST` /v1/categories

to create new categories

**Authorization**

`Bearer` User token

**Body**

|key|type|description|
|-|-|-|
|***name**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the name of category

Example:

```json
{
  "name": "Opopipipar"
}
```

**Responses**

```json

{
  "code": 201,
  "message": "Category Created!",
  "data": {
    "id": "ca0058cf-efe6-45ac-b616-57371e09a029",
    "name": "Opopipipar",
    "createdAt": "2024-06-23T10:57:55.507Z",
    "updatedAt": "2024-06-23T10:57:55.507Z"
  }
}

```

### `GET` /v1/categories/:categoryId

to retrive existing category

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|***categoryId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the id of category to retrieve|ba60fcb0-85bd-4c21-827c-77aa8e78e5ab|

**Responses**

```json

{
  "code": 200,
  "message": "Category retrieved!",
  "data": {
    "id": "ba60fcb0-85bd-4c21-827c-77aa8e78e5ab",
    "name": "snake",
    "createdAt": "2024-06-23T10:57:37.594Z",
    "updatedAt": "2024-06-23T10:57:37.594Z"
  }
}

```

### `PUT` /v1/categories/:categoryId

to edit existing category

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|***categoryId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the id of category to edit|ca0058cf-efe6-45ac-b616-57371e09a029|

**Body**

|key|type|description|
|-|-|-|
|***name**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the name of category

Example:

```json
{
  "name": "Osupipipar"
}
```

**Responses**

```json

{
  "code": 200,
  "message": "Category Updated",
  "data": {
    "id": "ca0058cf-efe6-45ac-b616-57371e09a029",
    "name": "Osupipipar",
    "createdAt": "2024-06-23T10:57:55.507Z",
    "updatedAt": "2024-06-23T10:57:58.375Z"
  }
}

```

### `DELETE` /v1/categories/:categoryId

to delete existing category

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|***categoryId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the id of category to delete|ca0058cf-efe6-45ac-b616-57371e09a029|

**Responses**

```json

{
  "code": 200,
  "message": "Category deleted",
  "data": {
    "id": "ca0058cf-efe6-45ac-b616-57371e09a029",
    "name": "Osupipipar",
    "createdAt": "2024-06-23T10:57:55.507Z",
    "updatedAt": "2024-06-23T10:57:58.375Z"
  }
}

```

### `GET` /v1/orders

retrieve all orders data

**Authorization**

`Bearer` User token

**Queries**

|query|type|description|example|
|-|-|-|-|
|***pageIndex**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the index of current pages|1|
|***pageSize**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the document limit for every pages|10|

**Responses**

```json

{
  "code": 200,
  "message": "Order retrieved!",
  "data": {
    "index": 1,
    "numOfPages": 1,
    "datas": [
      {
        "id": "33146511-8c01-47e5-9d09-0271dc00e2b6",
        "date": "2024-06-23T10:57:39.137Z",
        "totalPrice": 11982,
        "customerName": "Karl Wehner",
        "customerEmail": "letitia86@hotmail.com",
        "userId": "71458d15-48a0-4d77-a5cd-632b31e31713",
        "createdAt": "2024-06-23T10:57:39.140Z",
        "updatedAt": "2024-06-23T10:57:39.140Z"
      },
      {
        "id": "467c62fd-440c-4f3b-b61e-4309eecc435b",
        "date": "2024-06-23T10:57:39.137Z",
        "totalPrice": 37206,
        "customerName": "Debbie Brown",
        "customerEmail": "estel.rohan14@gmail.com",
        "userId": "6033b295-78cd-4c04-9f29-d1b0c4688547",
        "createdAt": "2024-06-23T10:57:39.140Z",
        "updatedAt": "2024-06-23T10:57:39.140Z"
      },
      {
        "id": "f08cc6a7-edde-4dd0-92c6-9520d9c384ed",
        "date": "2024-06-23T10:57:39.137Z",
        "totalPrice": 72709,
        "customerName": "Dawn Kling",
        "customerEmail": "adriana.johnston23@yahoo.com",
        "userId": "db9f3ab3-e675-4848-97f1-e3dc2553d232",
        "createdAt": "2024-06-23T10:57:39.140Z",
        "updatedAt": "2024-06-23T10:57:39.140Z"
      }
    ]
  }
}

```

### `POST` /v1/orders

create order data

**Authorization**

`Bearer` User token

**Body**

|key|type|description|
|-|-|-|
|***date**|_[isoDate](https://en.wikipedia.org/wiki/ISO_8601)_|the date order created
|***totalPrice**|_[float](https://en.wikipedia.org/wiki/Floating-point_arithmetic)_|the total prices of the orders
|***customerName**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the customer who name demand to order 
|***customerEmail**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the customer email who demand to order
|***userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the user id who created the order

Example:

```json
{
  "date": "1970-01-01T00:00:00.000Z",
  "totalPrice": 1000000,
  "customerName": "Debbie Brown",
  "customerEmail": "estel.rohan14@gmail.com",
  "userId": "6033b295-78cd-4c04-9f29-d1b0c4688547"
}
```

**Responses**

```json

{
  "code": 201,
  "message": "Order Created!",
  "data": {
    "id": "4a45f407-6e4f-4d9d-b5f6-ffd62336fb44",
    "date": "1970-01-01T00:00:00.000Z",
    "totalPrice": 1000000,
    "customerName": "Debbie Brown",
    "customerEmail": "estel.rohan14@gmail.com",
    "userId": "6033b295-78cd-4c04-9f29-d1b0c4688547",
    "createdAt": "2024-06-23T10:58:03.121Z",
    "updatedAt": "2024-06-23T10:58:03.121Z"
  }
}

```

### `GET` /v1/orders/:orderId

retrieve the order data

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**orderId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order id who need to retrieve their data|467c62fd-440c-4f3b-b61e-4309eecc435b|

**Responses**

```json

{
  "code": 200,
  "message": "Order retrieved!",
  "data": {
    "id": "467c62fd-440c-4f3b-b61e-4309eecc435b",
    "date": "2024-06-23T10:57:39.137Z",
    "totalPrice": 37206,
    "customerName": "Debbie Brown",
    "customerEmail": "estel.rohan14@gmail.com",
    "userId": "6033b295-78cd-4c04-9f29-d1b0c4688547",
    "createdAt": "2024-06-23T10:57:39.140Z",
    "updatedAt": "2024-06-23T10:57:39.140Z"
  }
}

```

### `PUT` /v1/orders/:orderId

update the order data

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**orderId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order id to get updated|4a45f407-6e4f-4d9d-b5f6-ffd62336fb44|

**Body**

|key|type|description|
|-|-|-|
|**date**|_[isoDate](https://en.wikipedia.org/wiki/ISO_8601)_|the date order created
|**totalPrice**|_[float](https://en.wikipedia.org/wiki/Floating-point_arithmetic)_|the total prices of the orders
|**customerName**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the customer who name demand to order 
|**customerEmail**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the customer email who demand to order
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the user id who created the order

Example:

```json
{
  "date": "1970-01-01T00:00:00.000Z",
  "totalPrice": 2000000,
  "customerName": "Debbie Brown",
  "customerEmail": "estel.rohan14@gmail.com",
  "userId": "6033b295-78cd-4c04-9f29-d1b0c4688547"
}
```

**Responses**

```json

{
  "code": 200,
  "message": "Order Updated!",
  "data": {
    "id": "4a45f407-6e4f-4d9d-b5f6-ffd62336fb44",
    "date": "1970-01-01T00:00:00.000Z",
    "totalPrice": 2000000,
    "customerName": "Debbie Brown",
    "customerEmail": "estel.rohan14@gmail.com",
    "userId": "6033b295-78cd-4c04-9f29-d1b0c4688547",
    "createdAt": "2024-06-23T10:58:03.121Z",
    "updatedAt": "2024-06-23T10:58:05.441Z"
  }
}

```

### `DELETE` /v1/orders/:orderId

delete the order data

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**orderId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order id to get deleted|4a45f407-6e4f-4d9d-b5f6-ffd62336fb44|

**Responses**

```json

{
  "code": 200,
  "message": "Order deleted",
  "data": {
    "id": "4a45f407-6e4f-4d9d-b5f6-ffd62336fb44",
    "date": "1970-01-01T00:00:00.000Z",
    "totalPrice": 2000000,
    "customerName": "Debbie Brown",
    "customerEmail": "estel.rohan14@gmail.com",
    "userId": "6033b295-78cd-4c04-9f29-d1b0c4688547",
    "createdAt": "2024-06-23T10:58:03.121Z",
    "updatedAt": "2024-06-23T10:58:05.441Z"
  }
}

```

### `GET` /v1/order-items

retrieve all order items data

**Authorization**

`Bearer` User token

**Queries**

|query|type|description|example|
|-|-|-|-|
|***pageIndex**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the index of current pages|1|
|***pageSize**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the document limit for every pages|10|

**Responses**

```json

{
  "code": 200,
  "message": "OrderItems retrieved!",
  "data": {
    "index": 1,
    "numOfPages": 1,
    "datas": [
      {
        "id": "548aa218-808c-4706-99af-737d92a83ee8",
        "orderId": "f08cc6a7-edde-4dd0-92c6-9520d9c384ed",
        "productId": "2c0bde27-0a9e-4f73-b772-3e0fd3f2a2c2",
        "quantity": 2,
        "unitPrice": 4699,
        "createdAt": "2024-06-23T10:57:40.152Z",
        "updatedAt": "2024-06-23T10:57:40.152Z"
      },
      {
        "id": "88596df3-662b-4c7e-a442-32a6a4c798a5",
        "orderId": "467c62fd-440c-4f3b-b61e-4309eecc435b",
        "productId": "4b392050-ef43-4f03-8f0e-0f34ef8c4ce3",
        "quantity": 1,
        "unitPrice": 7945,
        "createdAt": "2024-06-23T10:57:40.152Z",
        "updatedAt": "2024-06-23T10:57:40.152Z"
      },
      {
        "id": "bc4f9aa0-890d-45f4-bfc5-2d337390553a",
        "orderId": "33146511-8c01-47e5-9d09-0271dc00e2b6",
        "productId": "5366bbe2-f733-4e8c-ab02-2b34bd01053b",
        "quantity": 3,
        "unitPrice": 2657,
        "createdAt": "2024-06-23T10:57:40.152Z",
        "updatedAt": "2024-06-23T10:57:40.152Z"
      }
    ]
  }
}

```

### `POST` /v1/order-items

create order item data

**Authorization**

`Bearer` User token

**Body**

|key|type|description|
|-|-|-|
|***quantity**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the items quantity to get ordered
|***unitPrice**|_[float](https://en.wikipedia.org/wiki/Floating-point_arithmetic)_|the item prices
|***orderId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order id belong for this item
|***productId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the product id belong for this item

Example:

```json
{
  "quantity": 1,
  "unitPrice": 1000000,
  "orderId": "467c62fd-440c-4f3b-b61e-4309eecc435b",
  "productId": "4b392050-ef43-4f03-8f0e-0f34ef8c4ce3"
}
```

**Responses**

```json

{
  "code": 201,
  "message": "OrderItems Created",
  "data": {
    "id": "75cc1f5f-6cc9-4b2b-a301-87ede79b9381",
    "orderId": "467c62fd-440c-4f3b-b61e-4309eecc435b",
    "productId": "4b392050-ef43-4f03-8f0e-0f34ef8c4ce3",
    "quantity": 1,
    "unitPrice": 1000000,
    "createdAt": "2024-06-23T10:58:12.309Z",
    "updatedAt": "2024-06-23T10:58:12.309Z"
  }
}

```

### `GET` /v1/order-items/:orderItemId

get order item data

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**orderItemId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order item id who need to get retrieved|548aa218-808c-4706-99af-737d92a83ee8|

**Responses**

```json

{
  "code": 200,
  "message": "OrderItem Retrieved!",
  "data": {
    "id": "548aa218-808c-4706-99af-737d92a83ee8",
    "orderId": "f08cc6a7-edde-4dd0-92c6-9520d9c384ed",
    "productId": "2c0bde27-0a9e-4f73-b772-3e0fd3f2a2c2",
    "quantity": 2,
    "unitPrice": 4699,
    "createdAt": "2024-06-23T10:57:40.152Z",
    "updatedAt": "2024-06-23T10:57:40.152Z"
  }
}

```

### `PUT` /v1/order-items/:orderItemId

update order items

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**orderItemId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order item id who need get updated|548aa218-808c-4706-99af-737d92a83ee8|

**Body**

|key|type|description|
|-|-|-|
|***quantity**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the items quantity to get ordered
|***unitPrice**|_[float](https://en.wikipedia.org/wiki/Floating-point_arithmetic)_|the item prices
|***orderId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order id belong for this item
|***productId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the product id belong for this item

Example:

```json
{
  "quantity": 1,
  "unitPrice": 2000000,
  "orderId": "467c62fd-440c-4f3b-b61e-4309eecc435b",
  "productId": "4b392050-ef43-4f03-8f0e-0f34ef8c4ce3"
}
```

**Responses**

```json

{
  "code": 200,
  "message": "OrderItem Updated!",
  "data": {
    "id": "548aa218-808c-4706-99af-737d92a83ee8",
    "orderId": "467c62fd-440c-4f3b-b61e-4309eecc435b",
    "productId": "4b392050-ef43-4f03-8f0e-0f34ef8c4ce3",
    "quantity": 1,
    "unitPrice": 2000000,
    "createdAt": "2024-06-23T10:57:40.152Z",
    "updatedAt": "2024-06-23T10:58:14.382Z"
  }
}

```

### `DELETE` /v1/order-items/:orderItemId

delete order item

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|**orderItemId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order item id who need to get deleted|548aa218-808c-4706-99af-737d92a83ee8|

**Responses**

```json

{
  "code": 200,
  "message": "OrderItem deleted !",
  "data": {
    "id": "548aa218-808c-4706-99af-737d92a83ee8",
    "orderId": "467c62fd-440c-4f3b-b61e-4309eecc435b",
    "productId": "4b392050-ef43-4f03-8f0e-0f34ef8c4ce3",
    "quantity": 1,
    "unitPrice": 2000000,
    "createdAt": "2024-06-23T10:57:40.152Z",
    "updatedAt": "2024-06-23T10:58:14.382Z"
  }
}

```
