# inventory-system

An inventory management system app using express
that based on rpn phase1 week4 long run project

## Table of Contents

- [Features](#Features)
- [Project Structure](#ProjectStructure)
- [Environment Variables](#EnvironmentVariables)
- [Api Endpoints](#ApiEndpoints)

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
      "id": "51dc091b-0c97-42a6-ac9e-67e049b7a957",
      "name": "ImRakemoon",
      "email": "rakemoon@super.ma.il",
      "password": "$2a$08$ZjoAORysR2eSiZ5DxZLP1uLxQlyw1eRpqdexseLwZY6Q6zaOO9.jK",
      "role": "Admin",
      "createdAt": "2024-06-23T09:15:45.989Z",
      "updatedAt": "2024-06-23T09:15:45.989Z",
      "isEmailVerified": false
    },
    "tokens": {
      "access": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MWRjMDkxYi0wYzk3LTQyYTYtYWM5ZS02N2UwNDliN2E5NTciLCJpYXQiOjE3MTkxMzQxNDcsImV4cCI6MTcxOTEzNTk0NywidHlwZSI6ImFjY2VzcyJ9.eKTfXVGR4YCW_DrRZbod97S5F6zkn5miebuTq-w1c0U",
        "expires": "2024-06-23T09:45:47.203Z"
      },
      "refresh": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MWRjMDkxYi0wYzk3LTQyYTYtYWM5ZS02N2UwNDliN2E5NTciLCJpYXQiOjE3MTkxMzQxNDcsImV4cCI6MTcyMTcyNjE0NywidHlwZSI6InJlZnJlc2gifQ.bZRqRvWsXC64SaIvso6OahOTzjDUayOBG_LeB58TYLI",
        "expires": "2024-07-23T09:15:47.206Z"
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
      "id": "51dc091b-0c97-42a6-ac9e-67e049b7a957",
      "name": "ImRakemoon",
      "email": "rakemoon@super.ma.il",
      "password": "$2a$08$ZjoAORysR2eSiZ5DxZLP1uLxQlyw1eRpqdexseLwZY6Q6zaOO9.jK",
      "role": "Admin",
      "createdAt": "2024-06-23T09:15:45.989Z",
      "updatedAt": "2024-06-23T09:15:45.989Z",
      "isEmailVerified": false
    },
    "tokens": {
      "access": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MWRjMDkxYi0wYzk3LTQyYTYtYWM5ZS02N2UwNDliN2E5NTciLCJpYXQiOjE3MTkxMzQxNDgsImV4cCI6MTcxOTEzNTk0OCwidHlwZSI6ImFjY2VzcyJ9.fcqCv_59jgrCmuvyveYXwoTgmp-DfMjNoiC3oL9wLBY",
        "expires": "2024-06-23T09:45:48.654Z"
      },
      "refresh": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MWRjMDkxYi0wYzk3LTQyYTYtYWM5ZS02N2UwNDliN2E5NTciLCJpYXQiOjE3MTkxMzQxNDgsImV4cCI6MTcyMTcyNjE0OCwidHlwZSI6InJlZnJlc2gifQ.pcYMvB8oyAd_xN-BWmzE1mVLQprV3C5vw2yLzmVJCwg",
        "expires": "2024-07-23T09:15:48.654Z"
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
        "id": "51dc091b-0c97-42a6-ac9e-67e049b7a957",
        "name": "ImRakemoon",
        "email": "rakemoon@super.ma.il",
        "password": "$2a$08$ZjoAORysR2eSiZ5DxZLP1uLxQlyw1eRpqdexseLwZY6Q6zaOO9.jK",
        "role": "Admin",
        "createdAt": "2024-06-23T09:15:45.989Z",
        "updatedAt": "2024-06-23T09:15:45.989Z",
        "isEmailVerified": false
      },
      {
        "id": "63873c72-05a7-4692-aae1-823b78fd81b7",
        "name": "Estelle Hettinger",
        "email": "landen60@hotmail.com",
        "password": "$2a$08$J/JFeUrdCzSA6X9kHFWa1e/n0/K36EBVZq2IurK26N5Q8wH1enjci",
        "role": "User",
        "createdAt": "2024-06-23T09:15:41.288Z",
        "updatedAt": "2024-06-23T09:15:41.288Z",
        "isEmailVerified": false
      },
      {
        "id": "ad929472-4b1a-440b-be4f-7b3c74479485",
        "name": "Vera Pfeffer",
        "email": "harvey_fay@gmail.com",
        "password": "$2a$08$J/JFeUrdCzSA6X9kHFWa1e/n0/K36EBVZq2IurK26N5Q8wH1enjci",
        "role": "User",
        "createdAt": "2024-06-23T09:15:41.288Z",
        "updatedAt": "2024-06-23T09:15:41.288Z",
        "isEmailVerified": false
      },
      {
        "id": "b715c8a6-001a-431c-b194-1d5dad5c4abe",
        "name": "Ira Heathcote",
        "email": "eduardo_breitenberg@yahoo.com",
        "password": "$2a$08$J/JFeUrdCzSA6X9kHFWa1e/n0/K36EBVZq2IurK26N5Q8wH1enjci",
        "role": "User",
        "createdAt": "2024-06-23T09:15:41.288Z",
        "updatedAt": "2024-06-23T09:15:41.288Z",
        "isEmailVerified": false
      },
      {
        "id": "de2b1358-0198-4bef-9852-d8aef33b2e55",
        "name": "Hope Flatley",
        "email": "jamie14@hotmail.com",
        "password": "$2a$08$J/JFeUrdCzSA6X9kHFWa1e/n0/K36EBVZq2IurK26N5Q8wH1enjci",
        "role": "Admin",
        "createdAt": "2024-06-23T09:15:41.288Z",
        "updatedAt": "2024-06-23T09:15:41.288Z",
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
    "id": "7f47ed73-ba1a-4573-8152-544ce8670505",
    "name": "hantuKiyowo",
    "email": "hantu@kiyowo.co.uk",
    "password": "$2a$08$pFFUH5mT/TJkW3fuM29Q..Pa66i96ZA3qiw7yEapUK8du5nwUfUV.",
    "role": "User",
    "createdAt": "2024-06-23T09:15:51.540Z",
    "updatedAt": "2024-06-23T09:15:51.540Z",
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
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who need to retrieve|63873c72-05a7-4692-aae1-823b78fd81b7|

**Responses**

```json

{
  "code": 200,
  "message": "User succesfully retrieved!",
  "data": {
    "id": "63873c72-05a7-4692-aae1-823b78fd81b7",
    "name": "Estelle Hettinger",
    "email": "landen60@hotmail.com",
    "password": "$2a$08$J/JFeUrdCzSA6X9kHFWa1e/n0/K36EBVZq2IurK26N5Q8wH1enjci",
    "role": "User",
    "createdAt": "2024-06-23T09:15:41.288Z",
    "updatedAt": "2024-06-23T09:15:41.288Z",
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
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who will get the data update|7f47ed73-ba1a-4573-8152-544ce8670505|

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
    "id": "7f47ed73-ba1a-4573-8152-544ce8670505",
    "name": "bakYusa",
    "email": "bakbibuk@strip.email",
    "password": "$2a$08$Ku79k.Krt84lNpaglq8bQ.cOIxuQoFxoWzRtCSi3kWvxruGGX9VIu",
    "role": "User",
    "createdAt": "2024-06-23T09:15:51.540Z",
    "updatedAt": "2024-06-23T09:15:53.663Z",
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
|**userId**|_[uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier)_|an user id who will get deleted|7f47ed73-ba1a-4573-8152-544ce8670505|

**Responses**

```json

{
  "code": 200,
  "message": "Succesfully delete user!",
  "data": {
    "id": "7f47ed73-ba1a-4573-8152-544ce8670505",
    "name": "bakYusa",
    "email": "bakbibuk@strip.email",
    "password": "$2a$08$Ku79k.Krt84lNpaglq8bQ.cOIxuQoFxoWzRtCSi3kWvxruGGX9VIu",
    "role": "User",
    "createdAt": "2024-06-23T09:15:51.540Z",
    "updatedAt": "2024-06-23T09:15:53.663Z",
    "isEmailVerified": false
  }
}

```
