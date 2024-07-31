# inventory-system

An inventory management system app using express
that based on rpn phase1 week4 long run project

## Table of Contents

- [Features](#Features)
- [Project Structure](#Project-Structure)
- [Environment Variables](#Environment-Variables)
- [Api Documentation](#Api-Documentation)

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

**Product Routes**:

- `GET` [/v1/products](#GET-v1products)
- `POST` [/v1/products](#POST-v1products)
- `GET` [/v1/products/:productId](#GET-v1productsproductId)
- `PUT` [/v1/products/:productId](#PUT-v1productsproductId)
- `DELETE` [/v1/products/:productId](#DELETE-v1productsproductId)
- `GET` [/v1/products/search](#GET-v1productssearch)

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
      "id": "7be10a80-e44a-4f39-8656-79bb1cc820c2",
      "name": "ImRakemoon",
      "email": "rakemoon@super.ma.il",
      "password": "$2a$08$Dc0Xs5WUtLYG7DVr8ylBp.JMy7g7kLt7CPNQljcZFbibPNlsFllNu",
      "role": "Admin",
      "createdAt": "2024-06-23T13:10:53.481Z",
      "updatedAt": "2024-06-23T13:10:53.481Z",
      "isEmailVerified": false
    },
    "tokens": {
      "access": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YmUxMGE4MC1lNDRhLTRmMzktODY1Ni03OWJiMWNjODIwYzIiLCJpYXQiOjE3MTkxNDgyNTQsImV4cCI6MTcxOTE1MDA1NCwidHlwZSI6ImFjY2VzcyJ9.Ho0B9EX44O2eqMCTk5oupYWw5SQ_5uLD_xI1YrHWV0A",
        "expires": "2024-06-23T13:40:54.659Z"
      },
      "refresh": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YmUxMGE4MC1lNDRhLTRmMzktODY1Ni03OWJiMWNjODIwYzIiLCJpYXQiOjE3MTkxNDgyNTQsImV4cCI6MTcyMTc0MDI1NCwidHlwZSI6InJlZnJlc2gifQ.iA8XJOqkhQelWLOXV2XVGk0Ej8RAP0rqTpnrljwuFx8",
        "expires": "2024-07-23T13:10:54.666Z"
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
      "id": "7be10a80-e44a-4f39-8656-79bb1cc820c2",
      "name": "ImRakemoon",
      "email": "rakemoon@super.ma.il",
      "password": "$2a$08$Dc0Xs5WUtLYG7DVr8ylBp.JMy7g7kLt7CPNQljcZFbibPNlsFllNu",
      "role": "Admin",
      "createdAt": "2024-06-23T13:10:53.481Z",
      "updatedAt": "2024-06-23T13:10:53.481Z",
      "isEmailVerified": false
    },
    "tokens": {
      "access": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YmUxMGE4MC1lNDRhLTRmMzktODY1Ni03OWJiMWNjODIwYzIiLCJpYXQiOjE3MTkxNDgyNTYsImV4cCI6MTcxOTE1MDA1NiwidHlwZSI6ImFjY2VzcyJ9.TDxYtK04brKiljTTVh_goVPZqwb-6kOZT1w_HFu9RQI",
        "expires": "2024-06-23T13:40:56.029Z"
      },
      "refresh": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YmUxMGE4MC1lNDRhLTRmMzktODY1Ni03OWJiMWNjODIwYzIiLCJpYXQiOjE3MTkxNDgyNTYsImV4cCI6MTcyMTc0MDI1NiwidHlwZSI6InJlZnJlc2gifQ.fcvQvDd3rLXKljE1S4ZuVsjAEyCCiaenwE3RQ2W7qd0",
        "expires": "2024-07-23T13:10:56.029Z"
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
        "id": "0fa7322e-2641-44e5-b401-e9b6258f35e5",
        "name": "Benjamin Zboncak",
        "email": "efrain.bailey@gmail.com",
        "password": "$2a$08$aI/Iujnxj9A6vqCAl63taOyIdoj4IYtKVswayIvy7bw0HzpjUyGgG",
        "role": "User",
        "createdAt": "2024-06-23T13:10:48.819Z",
        "updatedAt": "2024-06-23T13:10:48.819Z",
        "isEmailVerified": false
      },
      {
        "id": "15c1f054-fc9f-4ad0-af15-adb803ecc7f1",
        "name": "Ignacio Howell",
        "email": "louisa85@yahoo.com",
        "password": "$2a$08$aI/Iujnxj9A6vqCAl63taOyIdoj4IYtKVswayIvy7bw0HzpjUyGgG",
        "role": "Admin",
        "createdAt": "2024-06-23T13:10:48.819Z",
        "updatedAt": "2024-06-23T13:10:48.819Z",
        "isEmailVerified": false
      },
      {
        "id": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
        "name": "Joyce Rohan",
        "email": "tomas91@hotmail.com",
        "password": "$2a$08$aI/Iujnxj9A6vqCAl63taOyIdoj4IYtKVswayIvy7bw0HzpjUyGgG",
        "role": "User",
        "createdAt": "2024-06-23T13:10:48.819Z",
        "updatedAt": "2024-06-23T13:10:48.819Z",
        "isEmailVerified": false
      },
      {
        "id": "7be10a80-e44a-4f39-8656-79bb1cc820c2",
        "name": "ImRakemoon",
        "email": "rakemoon@super.ma.il",
        "password": "$2a$08$Dc0Xs5WUtLYG7DVr8ylBp.JMy7g7kLt7CPNQljcZFbibPNlsFllNu",
        "role": "Admin",
        "createdAt": "2024-06-23T13:10:53.481Z",
        "updatedAt": "2024-06-23T13:10:53.481Z",
        "isEmailVerified": false
      },
      {
        "id": "dbc908f1-4834-4750-ab23-5385b738fc7c",
        "name": "Katherine Reilly",
        "email": "cathrine.lowe-lindgren11@gmail.com",
        "password": "$2a$08$aI/Iujnxj9A6vqCAl63taOyIdoj4IYtKVswayIvy7bw0HzpjUyGgG",
        "role": "User",
        "createdAt": "2024-06-23T13:10:48.819Z",
        "updatedAt": "2024-06-23T13:10:48.819Z",
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
    "id": "06604685-0b08-47bd-ba31-02fb6966a6d9",
    "name": "hantuKiyowo",
    "email": "hantu@kiyowo.co.uk",
    "password": "$2a$08$HNdZbuZxIW25tUVQ3VXvluTiYLDR8jIkpAcuQsN7uM6tgW2L9HT8G",
    "role": "User",
    "createdAt": "2024-06-23T13:10:58.782Z",
    "updatedAt": "2024-06-23T13:10:58.782Z",
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
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who need to retrieve|2e317601-3ba2-47a8-80da-0884c54b4eb1|

**Responses**

```json

{
  "code": 200,
  "message": "User succesfully retrieved!",
  "data": {
    "id": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
    "name": "Joyce Rohan",
    "email": "tomas91@hotmail.com",
    "password": "$2a$08$aI/Iujnxj9A6vqCAl63taOyIdoj4IYtKVswayIvy7bw0HzpjUyGgG",
    "role": "User",
    "createdAt": "2024-06-23T13:10:48.819Z",
    "updatedAt": "2024-06-23T13:10:48.819Z",
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
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who will get the data update|06604685-0b08-47bd-ba31-02fb6966a6d9|

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
    "id": "06604685-0b08-47bd-ba31-02fb6966a6d9",
    "name": "bakYusa",
    "email": "bakbibuk@strip.email",
    "password": "$2a$08$JCL43EIRz2DbVxtkbTxLBeY5zqsCmhoSC9d7IVuj3N.lY5ZA5qMxC",
    "role": "User",
    "createdAt": "2024-06-23T13:10:58.782Z",
    "updatedAt": "2024-06-23T13:11:01.059Z",
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
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who will get deleted|06604685-0b08-47bd-ba31-02fb6966a6d9|

**Responses**

```json

{
  "code": 200,
  "message": "Succesfully delete user!",
  "data": {
    "id": "06604685-0b08-47bd-ba31-02fb6966a6d9",
    "name": "bakYusa",
    "email": "bakbibuk@strip.email",
    "password": "$2a$08$JCL43EIRz2DbVxtkbTxLBeY5zqsCmhoSC9d7IVuj3N.lY5ZA5qMxC",
    "role": "User",
    "createdAt": "2024-06-23T13:10:58.782Z",
    "updatedAt": "2024-06-23T13:11:01.059Z",
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
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who need to retrive products data|2e317601-3ba2-47a8-80da-0884c54b4eb1|

**Responses**

```json

{
  "code": 200,
  "message": "Products Succesfully retrieved!",
  "data": [
    {
      "id": "cdffb3a4-385d-440b-a3f6-a56a8d5dfd43",
      "name": "Barbour's pit viper",
      "description": "Theatrum absum defleo aestivus caries adduco. Clementia demonstro corrupti vomito commodo delinquo alioqui. Curso volutabrum delectus vir tricesimus.",
      "price": 8092,
      "quantityInStock": 7,
      "categoryId": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3",
      "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
      "createdAt": "2024-06-23T13:10:50.495Z",
      "updatedAt": "2024-06-23T13:10:50.495Z"
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
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who need to retrive orders data|2e317601-3ba2-47a8-80da-0884c54b4eb1|

**Responses**

```json

{
  "code": 200,
  "message": "Orders Succesfully retrieved!",
  "data": [
    {
      "id": "1500495e-d350-416e-9afb-6529b453471b",
      "date": "2024-06-23T13:10:50.492Z",
      "totalPrice": 71204,
      "customerName": "Joyce Rohan",
      "customerEmail": "tomas91@hotmail.com",
      "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
      "createdAt": "2024-06-23T13:10:50.495Z",
      "updatedAt": "2024-06-23T13:10:50.495Z"
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
        "id": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3",
        "name": "snake",
        "createdAt": "2024-06-23T13:10:48.819Z",
        "updatedAt": "2024-06-23T13:10:48.819Z"
      },
      {
        "id": "6b012f09-d3cb-4bfd-943a-cbf2ada8ce25",
        "name": "snake",
        "createdAt": "2024-06-23T13:10:48.819Z",
        "updatedAt": "2024-06-23T13:10:48.819Z"
      },
      {
        "id": "d992f4b3-e71f-4eca-9810-26bd76e550e2",
        "name": "rabbit",
        "createdAt": "2024-06-23T13:10:48.819Z",
        "updatedAt": "2024-06-23T13:10:48.819Z"
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
    "id": "76a6101e-ef6d-4c9e-b8da-a773463b0725",
    "name": "Opopipipar",
    "createdAt": "2024-06-23T13:11:07.160Z",
    "updatedAt": "2024-06-23T13:11:07.160Z"
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
|***categoryId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the id of category to retrieve|1e79d5bd-e637-4bc1-9dcf-3c6622da95b3|

**Responses**

```json

{
  "code": 200,
  "message": "Category retrieved!",
  "data": {
    "id": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3",
    "name": "snake",
    "createdAt": "2024-06-23T13:10:48.819Z",
    "updatedAt": "2024-06-23T13:10:48.819Z"
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
|***categoryId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the id of category to edit|76a6101e-ef6d-4c9e-b8da-a773463b0725|

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
    "id": "76a6101e-ef6d-4c9e-b8da-a773463b0725",
    "name": "Osupipipar",
    "createdAt": "2024-06-23T13:11:07.160Z",
    "updatedAt": "2024-06-23T13:11:10.001Z"
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
|***categoryId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the id of category to delete|76a6101e-ef6d-4c9e-b8da-a773463b0725|

**Responses**

```json

{
  "code": 200,
  "message": "Category deleted",
  "data": {
    "id": "76a6101e-ef6d-4c9e-b8da-a773463b0725",
    "name": "Osupipipar",
    "createdAt": "2024-06-23T13:11:07.160Z",
    "updatedAt": "2024-06-23T13:11:10.001Z"
  }
}

```

### `GET` /v1/products

retrieve all products data

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
  "message": "Products retrieved!",
  "data": {
    "index": 1,
    "numOfPages": 1,
    "datas": [
      {
        "id": "06266073-3985-49ef-b904-a6e2f9e49371",
        "name": "Satin",
        "description": "Neque hic accusator curvo confugo. Acies decerno clarus complectus anser sapiente utrum adversus cubitum deripio. Appositus ventito cursus adstringo pel voluptatum carcer tergo tamisium.",
        "price": 5465,
        "quantityInStock": 8,
        "categoryId": "d992f4b3-e71f-4eca-9810-26bd76e550e2",
        "userId": "0fa7322e-2641-44e5-b401-e9b6258f35e5",
        "createdAt": "2024-06-23T13:10:50.495Z",
        "updatedAt": "2024-06-23T13:10:50.495Z"
      },
      {
        "id": "cdffb3a4-385d-440b-a3f6-a56a8d5dfd43",
        "name": "Barbour's pit viper",
        "description": "Theatrum absum defleo aestivus caries adduco. Clementia demonstro corrupti vomito commodo delinquo alioqui. Curso volutabrum delectus vir tricesimus.",
        "price": 8092,
        "quantityInStock": 7,
        "categoryId": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3",
        "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
        "createdAt": "2024-06-23T13:10:50.495Z",
        "updatedAt": "2024-06-23T13:10:50.495Z"
      },
      {
        "id": "fbabeba4-8cf3-4ed6-a03c-82c6b10644d8",
        "name": "Hairy bush viper",
        "description": "Victoria officiis facere. Advoco solus universe. Comes celebrer alii trepide conscendo adnuo vitiosus.",
        "price": 5530,
        "quantityInStock": 4,
        "categoryId": "6b012f09-d3cb-4bfd-943a-cbf2ada8ce25",
        "userId": "dbc908f1-4834-4750-ab23-5385b738fc7c",
        "createdAt": "2024-06-23T13:10:50.495Z",
        "updatedAt": "2024-06-23T13:10:50.495Z"
      }
    ]
  }
}

```

### `POST` /v1/products

to create products data

**Authorization**

`Bearer` User token

**Body**

|key|type|description|
|-|-|-|
|***name**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the name of the product
|***price**|_[float](https://en.wikipedia.org/wiki/Floating-point_arithmetic)_|the price of the product
|***description**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the description of the product
|***quantityInStock**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the quantity of the products
|***userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the user id who create this product
|***categoryId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the category id for this product

Example:

```json
{
  "name": "Aloha",
  "price": 1000,
  "description": "This is a brand new aloe verra with durian scene",
  "quantityInStock": 10,
  "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
  "categoryId": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3"
}
```

**Responses**

```json

{
  "code": 201,
  "message": "Product created!",
  "data": {
    "id": "f51166c2-de3b-471f-bcec-225f966ba5c0",
    "name": "Aloha",
    "description": "This is a brand new aloe verra with durian scene",
    "price": 1000,
    "quantityInStock": 10,
    "categoryId": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3",
    "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
    "createdAt": "2024-06-23T13:11:14.923Z",
    "updatedAt": "2024-06-23T13:11:14.923Z"
  }
}

```

### `GET` /v1/products/:productId

to retrieve product data

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|***productId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the product id who need to retrieve their data|cdffb3a4-385d-440b-a3f6-a56a8d5dfd43|

**Responses**

```json

{
  "code": 200,
  "message": "Product Retrieved!",
  "data": {
    "id": "cdffb3a4-385d-440b-a3f6-a56a8d5dfd43",
    "name": "Barbour's pit viper",
    "description": "Theatrum absum defleo aestivus caries adduco. Clementia demonstro corrupti vomito commodo delinquo alioqui. Curso volutabrum delectus vir tricesimus.",
    "price": 8092,
    "quantityInStock": 7,
    "categoryId": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3",
    "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
    "createdAt": "2024-06-23T13:10:50.495Z",
    "updatedAt": "2024-06-23T13:10:50.495Z"
  }
}

```

### `PUT` /v1/products/:productId

to edit product data

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|***productId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the product id to update the data|f51166c2-de3b-471f-bcec-225f966ba5c0|

**Body**

|key|type|description|
|-|-|-|
|**name**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the name of the product
|**price**|_[float](https://en.wikipedia.org/wiki/Floating-point_arithmetic)_|the price of the product
|**description**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the description of the product
|**quantityInStock**|_[integer](https://en.wikipedia.org/wiki/Integer)_|the quantity of the products
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the user id who create this product
|**categoryId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the category id for this product

Example:

```json
{
  "name": "BaiLoha",
  "price": 1000,
  "description": "This is a brand new aloe verra with durian scene",
  "quantityInStock": 10,
  "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
  "categoryId": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3"
}
```

**Responses**

```json

{
  "code": 200,
  "message": "Product Updated!",
  "data": {
    "id": "f51166c2-de3b-471f-bcec-225f966ba5c0",
    "name": "BaiLoha",
    "description": "This is a brand new aloe verra with durian scene",
    "price": 1000,
    "quantityInStock": 10,
    "categoryId": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3",
    "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
    "createdAt": "2024-06-23T13:11:14.923Z",
    "updatedAt": "2024-06-23T13:11:17.186Z"
  }
}

```

### `DELETE` /v1/products/:productId

to delete product data

**Authorization**

`Bearer` User token

**Parameters**

|parameter|type|description|example|
|-|-|-|-|
|***productId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the product id who to delete|f51166c2-de3b-471f-bcec-225f966ba5c0|

**Responses**

```json

{
  "code": 200,
  "message": "Product Deleted!",
  "data": {
    "id": "f51166c2-de3b-471f-bcec-225f966ba5c0",
    "name": "BaiLoha",
    "description": "This is a brand new aloe verra with durian scene",
    "price": 1000,
    "quantityInStock": 10,
    "categoryId": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3",
    "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
    "createdAt": "2024-06-23T13:11:14.923Z",
    "updatedAt": "2024-06-23T13:11:17.186Z"
  }
}

```

### `GET` /v1/products/search

to search product by category

**Authorization**

`Bearer` User token

**Queries**

|query|type|description|example|
|-|-|-|-|
|***category**|_[string](https://en.wikipedia.org/wiki/String_(computer_science))_|the category name|snake|

**Responses**

```json

{
  "code": 200,
  "message": "Product Retrieved!",
  "data": [
    {
      "id": "cdffb3a4-385d-440b-a3f6-a56a8d5dfd43",
      "name": "Barbour's pit viper",
      "description": "Theatrum absum defleo aestivus caries adduco. Clementia demonstro corrupti vomito commodo delinquo alioqui. Curso volutabrum delectus vir tricesimus.",
      "price": 8092,
      "quantityInStock": 7,
      "categoryId": "1e79d5bd-e637-4bc1-9dcf-3c6622da95b3",
      "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
      "createdAt": "2024-06-23T13:10:50.495Z",
      "updatedAt": "2024-06-23T13:10:50.495Z"
    }
  ]
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
        "id": "1500495e-d350-416e-9afb-6529b453471b",
        "date": "2024-06-23T13:10:50.492Z",
        "totalPrice": 71204,
        "customerName": "Joyce Rohan",
        "customerEmail": "tomas91@hotmail.com",
        "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
        "createdAt": "2024-06-23T13:10:50.495Z",
        "updatedAt": "2024-06-23T13:10:50.495Z"
      },
      {
        "id": "46593a05-868f-436b-9410-1bfddacdc82b",
        "date": "2024-06-23T13:10:50.492Z",
        "totalPrice": 37600,
        "customerName": "Benjamin Zboncak",
        "customerEmail": "efrain.bailey@gmail.com",
        "userId": "0fa7322e-2641-44e5-b401-e9b6258f35e5",
        "createdAt": "2024-06-23T13:10:50.495Z",
        "updatedAt": "2024-06-23T13:10:50.495Z"
      },
      {
        "id": "61b3ae4d-ee74-4afc-b443-b5f9d637288b",
        "date": "2024-06-23T13:10:50.492Z",
        "totalPrice": 98909,
        "customerName": "Katherine Reilly",
        "customerEmail": "cathrine.lowe-lindgren11@gmail.com",
        "userId": "dbc908f1-4834-4750-ab23-5385b738fc7c",
        "createdAt": "2024-06-23T13:10:50.495Z",
        "updatedAt": "2024-06-23T13:10:50.495Z"
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
  "customerName": "Joyce Rohan",
  "customerEmail": "tomas91@hotmail.com",
  "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1"
}
```

**Responses**

```json

{
  "code": 201,
  "message": "Order Created!",
  "data": {
    "id": "d5def1db-a9a9-4097-9700-356fdf781a10",
    "date": "1970-01-01T00:00:00.000Z",
    "totalPrice": 1000000,
    "customerName": "Joyce Rohan",
    "customerEmail": "tomas91@hotmail.com",
    "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
    "createdAt": "2024-06-23T13:11:22.613Z",
    "updatedAt": "2024-06-23T13:11:22.613Z"
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
|**orderId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order id who need to retrieve their data|1500495e-d350-416e-9afb-6529b453471b|

**Responses**

```json

{
  "code": 200,
  "message": "Order retrieved!",
  "data": {
    "id": "1500495e-d350-416e-9afb-6529b453471b",
    "date": "2024-06-23T13:10:50.492Z",
    "totalPrice": 71204,
    "customerName": "Joyce Rohan",
    "customerEmail": "tomas91@hotmail.com",
    "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
    "createdAt": "2024-06-23T13:10:50.495Z",
    "updatedAt": "2024-06-23T13:10:50.495Z"
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
|**orderId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order id to get updated|d5def1db-a9a9-4097-9700-356fdf781a10|

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
  "customerName": "Joyce Rohan",
  "customerEmail": "tomas91@hotmail.com",
  "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1"
}
```

**Responses**

```json

{
  "code": 200,
  "message": "Order Updated!",
  "data": {
    "id": "d5def1db-a9a9-4097-9700-356fdf781a10",
    "date": "1970-01-01T00:00:00.000Z",
    "totalPrice": 2000000,
    "customerName": "Joyce Rohan",
    "customerEmail": "tomas91@hotmail.com",
    "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
    "createdAt": "2024-06-23T13:11:22.613Z",
    "updatedAt": "2024-06-23T13:11:25.285Z"
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
|**orderId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order id to get deleted|d5def1db-a9a9-4097-9700-356fdf781a10|

**Responses**

```json

{
  "code": 200,
  "message": "Order deleted",
  "data": {
    "id": "d5def1db-a9a9-4097-9700-356fdf781a10",
    "date": "1970-01-01T00:00:00.000Z",
    "totalPrice": 2000000,
    "customerName": "Joyce Rohan",
    "customerEmail": "tomas91@hotmail.com",
    "userId": "2e317601-3ba2-47a8-80da-0884c54b4eb1",
    "createdAt": "2024-06-23T13:11:22.613Z",
    "updatedAt": "2024-06-23T13:11:25.285Z"
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
        "id": "459d7c6d-ca9c-4af4-8d70-7e7a468c8465",
        "orderId": "46593a05-868f-436b-9410-1bfddacdc82b",
        "productId": "06266073-3985-49ef-b904-a6e2f9e49371",
        "quantity": 2,
        "unitPrice": 5465,
        "createdAt": "2024-06-23T13:10:51.281Z",
        "updatedAt": "2024-06-23T13:10:51.281Z"
      },
      {
        "id": "a7b912ce-d643-4e75-bf8e-c7be7b0a0995",
        "orderId": "1500495e-d350-416e-9afb-6529b453471b",
        "productId": "cdffb3a4-385d-440b-a3f6-a56a8d5dfd43",
        "quantity": 3,
        "unitPrice": 8092,
        "createdAt": "2024-06-23T13:10:51.281Z",
        "updatedAt": "2024-06-23T13:10:51.281Z"
      },
      {
        "id": "ffffbd8e-c0c7-4783-9ce7-65d3058a70ad",
        "orderId": "61b3ae4d-ee74-4afc-b443-b5f9d637288b",
        "productId": "fbabeba4-8cf3-4ed6-a03c-82c6b10644d8",
        "quantity": 3,
        "unitPrice": 5530,
        "createdAt": "2024-06-23T13:10:51.281Z",
        "updatedAt": "2024-06-23T13:10:51.281Z"
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
  "orderId": "1500495e-d350-416e-9afb-6529b453471b",
  "productId": "cdffb3a4-385d-440b-a3f6-a56a8d5dfd43"
}
```

**Responses**

```json

{
  "code": 201,
  "message": "OrderItems Created",
  "data": {
    "id": "411ce3b3-232b-4d00-9102-ad46146635cf",
    "orderId": "1500495e-d350-416e-9afb-6529b453471b",
    "productId": "cdffb3a4-385d-440b-a3f6-a56a8d5dfd43",
    "quantity": 1,
    "unitPrice": 1000000,
    "createdAt": "2024-06-23T13:11:31.097Z",
    "updatedAt": "2024-06-23T13:11:31.097Z"
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
|**orderItemId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order item id who need to get retrieved|459d7c6d-ca9c-4af4-8d70-7e7a468c8465|

**Responses**

```json

{
  "code": 200,
  "message": "OrderItem Retrieved!",
  "data": {
    "id": "459d7c6d-ca9c-4af4-8d70-7e7a468c8465",
    "orderId": "46593a05-868f-436b-9410-1bfddacdc82b",
    "productId": "06266073-3985-49ef-b904-a6e2f9e49371",
    "quantity": 2,
    "unitPrice": 5465,
    "createdAt": "2024-06-23T13:10:51.281Z",
    "updatedAt": "2024-06-23T13:10:51.281Z"
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
|**orderItemId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order item id who need get updated|459d7c6d-ca9c-4af4-8d70-7e7a468c8465|

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
  "orderId": "1500495e-d350-416e-9afb-6529b453471b",
  "productId": "cdffb3a4-385d-440b-a3f6-a56a8d5dfd43"
}
```

**Responses**

```json

{
  "code": 200,
  "message": "OrderItem Updated!",
  "data": {
    "id": "459d7c6d-ca9c-4af4-8d70-7e7a468c8465",
    "orderId": "1500495e-d350-416e-9afb-6529b453471b",
    "productId": "cdffb3a4-385d-440b-a3f6-a56a8d5dfd43",
    "quantity": 1,
    "unitPrice": 2000000,
    "createdAt": "2024-06-23T13:10:51.281Z",
    "updatedAt": "2024-06-23T13:11:32.956Z"
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
|**orderItemId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|the order item id who need to get deleted|459d7c6d-ca9c-4af4-8d70-7e7a468c8465|

**Responses**

```json

{
  "code": 200,
  "message": "OrderItem deleted !",
  "data": {
    "id": "459d7c6d-ca9c-4af4-8d70-7e7a468c8465",
    "orderId": "1500495e-d350-416e-9afb-6529b453471b",
    "productId": "cdffb3a4-385d-440b-a3f6-a56a8d5dfd43",
    "quantity": 1,
    "unitPrice": 2000000,
    "createdAt": "2024-06-23T13:10:51.281Z",
    "updatedAt": "2024-06-23T13:11:32.956Z"
  }
}

```
