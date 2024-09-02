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

{replace:auth:routes}

**User Routes**:

{replace:user:routes}

**Category Routes**:

{replace:category:routes}

**Product Routes**:

{replace:product:routes}

**Order Routes**:

{replace:order:routes}

**Order Items**:

{replace:orderItem:routes}

## Api Endpoints

{replace:auth:schemas}

{replace:user:schemas}

{replace:category:schemas}

{replace:product:schemas}

{replace:order:schemas}

{replace:orderItem:schemas}
