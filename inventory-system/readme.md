# Inventory-System : Express JS, Prisma, MySQL

## Installation
**1.** Clone project
```
https://github.com/aldoLorenzio/inventory-system.git
```

**2.** Install the depedencies :
```
npm install
```

**3.** Add .env file 
```
DATABASE_URL = "YOUR URL"
PORT = 3000
JWT_SECRET = YOUR_SECRET_KEY
JWT_ACCESS_EXPIRATION_MINUTES = 120 //if you want JWT access valid for 120 minutes
JWT_REFRESH_EXPIRATION_DAYS = 30 //if you want JWT refresh valid for 30 days (still not work, cause i still not develope it yet)
```

**4.** Run the project
```
npm run dev
```



## API End Point
**- AUTH Route** \
User Register: `POST /v1/auth/register`\
User Login: `POST /v1/auth/login`

**- USER Route** \
Get Users                    : `GET /v1/user/`\
Get User By ID               : `GET /v1/user/:userId`\
Update User By ID            : `PATCH /v1/user/:userId`\
Delete User By ID            : `DELETE /v1/user/:userId`

**- Category Route** \
Create Category              : `POST /v1/category`\
Get Categorys                : `GET /v1/category`\
Get Category by ID           : `GET /v1/category/:categoryId`\
Update Category by ID        : `PATCH /v1/category/:categoryId`\
Delete Category by ID        : `DELETE /v1/category:/categoryId`

**- Product Route**\
Create Product                : `POST /v1/product`\
Get Products                  : `GET /v1/product`\
Get Product by ID             : `GET /v1/product/:productId`\
Update Product by ID          : `PATCH /v1/product/:productId`\
Delete Product by ID          : `DELETE /v1/product/:productId`\
Get Products by UserId        : `GET /v1/user/:userId/products`

**- Order Route**\
Create Order                  : `POST /v1/order`\
Get Orders                    : `GET /v1/order`\
Get Order by ID               : `GET /v1/order/:orderId`\
Update Order by ID            : `PATCH /v1/order/:orderId`\
Delete Product By ID          : `DELETE /v1/order/:orderId`\
Get Orders by UserId          : `GET /v1/user/:userId/order`

**- OrderItem Route**\
Create OrderItem              : `POST /v1/orderItem`\
Get OrderItem                 : `GET /v1/orderItem`\
Get OrderItem By ID           : `GET /v1/orderItem/:orderItem`\
Update Order By ID            : `PATCH /v1/orderItem/:orderItem`\
Delete Product By ID          : `DELETE /v1/orderItem/:orderItem`


## Input in Each Route
**- Auth Route**
```
email             (unique, email format, required)
password          (string, required)
```

**- User Route**
```
name              (string, required)
email             (unique, email format, required)
passowrd          (string, required)
role              (string, default "user" or can be filled with "admin")
```

**- Category Route**
```
name              (string, required)
```

**- Product**
```
name              (string, required)
description       (string, required)
price             (float, required)
quantityInStock   (int, required)
categoryId        (UUID, existed Category ID, required)
userId            (UUID, existed user ID, required)
```

**- Order**
```
date              (ISO date, required)
totalPrice        (float, default (0))
customerName      (string, required)
customerEmail     (email format, unique, required)
userID            (UUID, existed User ID, required)
```

**- OrderItem**
```
orderId           (UUID, existed orderID, required)
productId         (UUID, existed productID, required)
quantity          (int, required)
unitPrice         (float, required)
```

## Sucessfull Response API
**Register User -> POST /v1/register**
```json
{
    "userCreated": {
        "id": "e2f940e0-5071-4fc8-8656-85141462d6f4",
        "name": "testing",
        "email": "testing2@gmail.com",
        "password": "$2a$08$emSaPA1mp6KujIcXr3oqle/f.EINQUIw8Grz500DimX6ZzosiEzmS",
        "role": "admin",
        "createdAt": "2024-02-16T10:08:31.968Z",
        "updatedAt": "2024-02-16T10:08:31.968Z",
        "isEmailVerified": false
    }
}
```

**Login User -> POST /v1/auth/login**
```json
{
    "user": {
        "id": "ffcd5d5a-5b0c-44a7-b057-18c12164dcf3",
        "name": "Aldo Lorenzio adm",
        "email": "dodo2@gmail.com",
        "password": "$2a$08$hENMWOyVtHoX76IAyq1JaerxkJmomqM0fYHMi7mqSCv0X/VanxBVu",
        "role": "admin",
        "createdAt": "2024-02-16T09:59:06.065Z",
        "updatedAt": "2024-02-16T09:59:06.065Z",
        "isEmailVerified": false
    },
    "tokens": {
        "access": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZmNkNWQ1YS01YjBjLTQ0YTctYjA1Ny0xOGMxMjE2NGRjZjMiLCJpYXQiOjE3MDgwNzgyMTcsImV4cCI6MTcwODA4NTQxNywidHlwZSI6ImFjY2VzcyJ9.uRjt3qH0UNMVgk3GlCCSRbzizcAjq-yPpoDm-MoZiHk",
            "expires": "2024-02-16T12:10:17.417Z"
        },
        "refresh": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZmNkNWQ1YS01YjBjLTQ0YTctYjA1Ny0xOGMxMjE2NGRjZjMiLCJpYXQiOjE3MDgwNzgyMTcsImV4cCI6MTcxMDY3MDIxNywidHlwZSI6InJlZnJlc2gifQ.Rdpyo0qT87sagNnjRWzkadKSWKap-nNdt2qDGI7XSYs",
            "expires": "2024-03-17T10:10:17.417Z"
        }
    }
}
```

**Get Users -> GET /v1/user**
```json
{
    "status": 200,
    "message": "Get Users Success",
    "data": [
        {
            "id": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
            "name": "Aldo Lorenzio",
            "email": "dodo@gmail.com",
            "password": "$2a$08$2EgSmBqpgYAWMK83FkMLl.oWjYbPNqDjnnAk2GPGWQ7QDnVBzj9h6",
            "role": "user",
            "createdAt": "2024-02-16T09:57:38.795Z",
            "updatedAt": "2024-02-16T09:57:38.795Z",
            "isEmailVerified": false
        },
        {
            "id": "ffcd5d5a-5b0c-44a7-b057-18c12164dcf3",
            "name": "Aldo Lorenzio adm",
            "email": "dodo2@gmail.com",
            "password": "$2a$08$hENMWOyVtHoX76IAyq1JaerxkJmomqM0fYHMi7mqSCv0X/VanxBVu",
            "role": "admin",
            "createdAt": "2024-02-16T09:59:06.065Z",
            "updatedAt": "2024-02-16T09:59:06.065Z",
            "isEmailVerified": false
        },
    ]
}
```

**Delete Users -> DELETE /v1/user**
```json
{
    "status": 200,
    "message": "Delete User Success",
    "data": null
}
```

**Update Users -> PATCH /v1/user**
```json
{
    "status": 200,
    "message": "Update User success",
    "data": {
        "id": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
        "name": "UpdatedName",
        "email": "dodo@gmail.com",
        "password": "$2a$08$2EgSmBqpgYAWMK83FkMLl.oWjYbPNqDjnnAk2GPGWQ7QDnVBzj9h6",
        "role": "user",
        "createdAt": "2024-02-16T09:57:38.795Z",
        "updatedAt": "2024-02-16T10:16:47.884Z",
        "isEmailVerified": false
    }
}
```

**Get User By ID -> GET /v1/user/:userID**
```JSON
{
    "status": 200,
    "message": "Get User Success",
    "data": {
        "id": "ffcd5d5a-5b0c-44a7-b057-18c12164dcf3",
        "name": "Aldo Lorenzio adm",
        "email": "dodo2@gmail.com",
        "password": "$2a$08$hENMWOyVtHoX76IAyq1JaerxkJmomqM0fYHMi7mqSCv0X/VanxBVu",
        "role": "admin",
        "createdAt": "2024-02-16T09:59:06.065Z",
        "updatedAt": "2024-02-16T09:59:06.065Z",
        "isEmailVerified": false
    }
}
```

**Create Category -> POST /v1/category**
```JSON
{
    "status": 201,
    "message": "Create Category Success",
    "data": {
        "id": "9f2c1630-8033-4e90-996f-8d46f729f735",
        "name": "susu",
        "createdAt": "2024-02-16T10:27:44.100Z",
        "updatedAt": "2024-02-16T10:27:44.100Z"
    }
}
```

**Get Categorys -> GET /v1/category**
```JSON
{
    "status": 200,
    "message": "Get Categorys Success",
    "data": [
        {
            "id": "fb0cb650-a6ff-492a-b4f8-538f5cc71272",
            "name": "rokok",
            "createdAt": "2024-02-16T10:28:15.264Z",
            "updatedAt": "2024-02-16T10:28:15.264Z",
            "products": []
        },
        {
            "id": "9f2c1630-8033-4e90-996f-8d46f729f735",
            "name": "susu",
            "createdAt": "2024-02-16T10:27:44.100Z",
            "updatedAt": "2024-02-16T10:27:44.100Z",
            "products": []
        }
    ]
}
```

**Get Category By ID -> GET /v1/category/:categoryId**
```JSON
{
    "status": 200,
    "message": "Get Category Success",
    "data": {
        "id": "fb0cb650-a6ff-492a-b4f8-538f5cc71272",
        "name": "rokok",
        "createdAt": "2024-02-16T10:28:15.264Z",
        "updatedAt": "2024-02-16T10:28:15.264Z",
        "products": []
    }
}
```

**Delete Category By ID -> DELETE /v1/category/:categoryId**
```JSON
{
    "status": 200,
    "message": "Delete Category Success",
    "data": null
}
```

**Update Category By ID -> PATCH /v1/category/:categoryId**
```JSON
{
    "status": 200,
    "message": "Update Category Success",
    "data": {
        "id": "1e277870-439f-43fa-b241-da55a7ce267a",
        "name": "updated",
        "createdAt": "2024-02-16T10:29:50.217Z",
        "updatedAt": "2024-02-16T10:30:04.249Z"
    }
}
```

**Create Product -> POST /v1/product**
```JSON
{
    "status": 201,
    "message": "Create Product Success",
    "data": {
        "id": "ce42a7d6-8f5b-4ebf-b20e-436b53a7eda1",
        "name": "Ultra milk full cream",
        "description": "Susu UHT full cream",
        "price": 5000,
        "quantityInStock": 200,
        "categoryId": "9f2c1630-8033-4e90-996f-8d46f729f735",
        "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
        "createdAt": "2024-02-16T10:31:32.312Z",
        "updatedAt": "2024-02-16T10:31:32.312Z"
    }
}
```

**Get Products -> GET /v1/product**
```JSON
{
    "status": 200,
    "message": "Get Products Success",
    "data": [
        {
            "id": "ce42a7d6-8f5b-4ebf-b20e-436b53a7eda1",
            "name": "Ultra milk full cream",
            "description": "Susu UHT full cream",
            "price": 5000,
            "quantityInStock": 200,
            "categoryId": "9f2c1630-8033-4e90-996f-8d46f729f735",
            "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
            "createdAt": "2024-02-16T10:31:32.312Z",
            "updatedAt": "2024-02-16T10:31:32.312Z"
        },
        {
            "id": "e6fa7cf1-a5e2-47a9-8135-5a64eeff94d4",
            "name": "Sampoerna Mild",
            "description": "Rokok filter",
            "price": 32000,
            "quantityInStock": 200,
            "categoryId": "fb0cb650-a6ff-492a-b4f8-538f5cc71272",
            "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
            "createdAt": "2024-02-16T10:35:18.576Z",
            "updatedAt": "2024-02-16T10:35:18.576Z"
        }
    ]
}
```

**Get Product By ID -> GET /v1/product/:productID**
```JSON
{
    "status": 200,
    "message": "Get Product Success",
    "data": {
        "id": "ce42a7d6-8f5b-4ebf-b20e-436b53a7eda1",
        "name": "Ultra milk full cream",
        "description": "Susu UHT full cream",
        "price": 5000,
        "quantityInStock": 200,
        "categoryId": "9f2c1630-8033-4e90-996f-8d46f729f735",
        "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
        "createdAt": "2024-02-16T10:31:32.312Z",
        "updatedAt": "2024-02-16T10:31:32.312Z"
    }
}
```

**Delete Product by ID -> DELETE /v1/product/:productID**
```JSON
{
    "status": 200,
    "message": "Delete Product Success",
    "data": null
}
```

**Update Product by ID -> PATCH /v1/product/:productID**
```JSON
{
    "status": 200,
    "message": "Update Product Success",
    "data": {
        "id": "ce42a7d6-8f5b-4ebf-b20e-436b53a7eda1",
        "name": "Ultra milk full cream",
        "description": "updated",
        "price": 5000,
        "quantityInStock": 200,
        "categoryId": "9f2c1630-8033-4e90-996f-8d46f729f735",
        "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
        "createdAt": "2024-02-16T10:31:32.312Z",
        "updatedAt": "2024-02-16T10:36:43.520Z"
    }
}
```

**Get Product by User -> GET /v1/user/:userId/products**
```JSON
{
    "status": 200,
    "message": "Get Product by User Success",
    "data": [
        {
            "id": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
            "name": "UpdatedName",
            "email": "dodo@gmail.com",
            "password": "$2a$08$2EgSmBqpgYAWMK83FkMLl.oWjYbPNqDjnnAk2GPGWQ7QDnVBzj9h6",
            "role": "user",
            "createdAt": "2024-02-16T09:57:38.795Z",
            "updatedAt": "2024-02-16T10:16:47.884Z",
            "isEmailVerified": false,
            "products": [
                {
                    "id": "ce42a7d6-8f5b-4ebf-b20e-436b53a7eda1",
                    "name": "Ultra milk full cream",
                    "description": "updated",
                    "price": 5000,
                    "quantityInStock": 200,
                    "categoryId": "9f2c1630-8033-4e90-996f-8d46f729f735",
                    "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
                    "createdAt": "2024-02-16T10:31:32.312Z",
                    "updatedAt": "2024-02-16T10:36:43.520Z"
                },
                {
                    "id": "e6fa7cf1-a5e2-47a9-8135-5a64eeff94d4",
                    "name": "Sampoerna Mild",
                    "description": "Rokok filter",
                    "price": 32000,
                    "quantityInStock": 200,
                    "categoryId": "fb0cb650-a6ff-492a-b4f8-538f5cc71272",
                    "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
                    "createdAt": "2024-02-16T10:35:18.576Z",
                    "updatedAt": "2024-02-16T10:35:18.576Z"
                }
            ]
        }
    ]
}
```

**Create Order -> POST /v1/order**
```JSON
{
    "status": 201,
    "message": "Create Order Success",
    "data": {
        "id": "c11638ef-e0e3-4ffb-91ec-fae0ed73de05",
        "date": "2023-12-29T18:00:00.000Z",
        "totalPrice": 0,
        "customerName": "Dodo",
        "customerEmail": "dodo@gmail.com",
        "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
        "createdAt": "2024-02-16T10:38:42.046Z",
        "updatedAt": "2024-02-16T10:38:42.046Z"
    }
}
```

**Get Orders -> GET /v1/order**
```JSON
{
    "status": 200,
    "message": "Get Orders Success",
    "data": [
        {
            "id": "c11638ef-e0e3-4ffb-91ec-fae0ed73de05",
            "date": "2023-12-29T18:00:00.000Z",
            "totalPrice": 0,
            "customerName": "Dodo",
            "customerEmail": "dodo@gmail.com",
            "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
            "createdAt": "2024-02-16T10:38:42.046Z",
            "updatedAt": "2024-02-16T10:38:42.046Z"
        },
        {
            "id": "bb77987a-f88f-42d9-91ac-3c9ff626deb0",
            "date": "2023-12-29T18:00:00.000Z",
            "totalPrice": 0,
            "customerName": "test",
            "customerEmail": "test@gmail.com",
            "userId": "6410d1c0-e8cf-42a8-89b6-6b2484e02e25",
            "createdAt": "2024-02-16T10:39:38.555Z",
            "updatedAt": "2024-02-16T10:39:38.555Z"
        }
    ]
}
```

**Get Order by ID -> GET /v1/order/:orderId**
```JSON
{
    "status": 200,
    "message": "Get Order Success",
    "data": {
        "id": "c11638ef-e0e3-4ffb-91ec-fae0ed73de05",
        "date": "2023-12-29T18:00:00.000Z",
        "totalPrice": 0,
        "customerName": "Dodo",
        "customerEmail": "dodo@gmail.com",
        "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
        "createdAt": "2024-02-16T10:38:42.046Z",
        "updatedAt": "2024-02-16T10:38:42.046Z"
    }
}
```

**Delete Order by ID -> DELETE /v1/order/:orderID**
```JSON
{
    "status": 200,
    "message": "Delete Order Success",
    "data": null
}
```

**Update Order by ID -> PATCH /v1/order/:orderID**
```JSON
{
    "status": 200,
    "message": "Update Order Success",
    "data": {
        "id": "bb77987a-f88f-42d9-91ac-3c9ff626deb0",
        "date": "2023-12-29T18:00:00.000Z",
        "totalPrice": 0,
        "customerName": "updated",
        "customerEmail": "test@gmail.com",
        "userId": "6410d1c0-e8cf-42a8-89b6-6b2484e02e25",
        "createdAt": "2024-02-16T10:39:38.555Z",
        "updatedAt": "2024-02-16T10:40:54.299Z"
    }
}
```

**Get Order by User -> GET /v1/user/:userID/orders**
```JSON
{
    "status": 200,
    "message": "Get Product by User Success",
    "data": [
        {
            "id": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
            "name": "UpdatedName",
            "email": "dodo@gmail.com",
            "password": "$2a$08$2EgSmBqpgYAWMK83FkMLl.oWjYbPNqDjnnAk2GPGWQ7QDnVBzj9h6",
            "role": "user",
            "createdAt": "2024-02-16T09:57:38.795Z",
            "updatedAt": "2024-02-16T10:16:47.884Z",
            "isEmailVerified": false,
            "orders": [
                {
                    "id": "c11638ef-e0e3-4ffb-91ec-fae0ed73de05",
                    "date": "2023-12-29T18:00:00.000Z",
                    "totalPrice": 0,
                    "customerName": "Dodo",
                    "customerEmail": "dodo@gmail.com",
                    "userId": "5b1a8386-31ff-49f9-ab17-4ad68f34d1b3",
                    "createdAt": "2024-02-16T10:38:42.046Z",
                    "updatedAt": "2024-02-16T10:38:42.046Z"
                }
            ]
        }
    ]
}
```

**Create OrderItem -> POST /v1/orderItem**
```JSON
{
    "status": 201,
    "message": "Create OrderItem Success",
    "data": {
        "id": "475b541d-dd9c-4f83-9c97-3dd7570bb8e8",
        "orderId": "c11638ef-e0e3-4ffb-91ec-fae0ed73de05",
        "productId": "ce42a7d6-8f5b-4ebf-b20e-436b53a7eda1",
        "quantity": 5,
        "unitPrice": 5000,
        "createdAt": "2024-02-16T10:43:37.187Z",
        "updatedAt": "2024-02-16T10:43:37.187Z"
    }
}
```

**Get OrderItems -> GET /v1/orderItem**
```JSON
{
    "status": 200,
    "message": "Get OrderItems Success",
    "data": [
        {
            "id": "475b541d-dd9c-4f83-9c97-3dd7570bb8e8",
            "orderId": "c11638ef-e0e3-4ffb-91ec-fae0ed73de05",
            "productId": "ce42a7d6-8f5b-4ebf-b20e-436b53a7eda1",
            "quantity": 5,
            "unitPrice": 5000,
            "createdAt": "2024-02-16T10:43:37.187Z",
            "updatedAt": "2024-02-16T10:43:37.187Z"
        },
        {
            "id": "aab2df35-d734-4ba9-973c-ecaeb20f4aed",
            "orderId": "c11638ef-e0e3-4ffb-91ec-fae0ed73de05",
            "productId": "ce42a7d6-8f5b-4ebf-b20e-436b53a7eda1",
            "quantity": 2,
            "unitPrice": 5000,
            "createdAt": "2024-02-16T10:43:48.252Z",
            "updatedAt": "2024-02-16T10:43:48.252Z"
        }
    ]
}
```

**Get OrderItem by ID -> GET /v1/orderItem/:orderItemId**
```JSON
{
    "status": 200,
    "message": "Get OrderItem Success",
    "data": {
        "id": "475b541d-dd9c-4f83-9c97-3dd7570bb8e8",
        "orderId": "c11638ef-e0e3-4ffb-91ec-fae0ed73de05",
        "productId": "ce42a7d6-8f5b-4ebf-b20e-436b53a7eda1",
        "quantity": 5,
        "unitPrice": 5000,
        "createdAt": "2024-02-16T10:43:37.187Z",
        "updatedAt": "2024-02-16T10:43:37.187Z"
    }
}
```

**Delete OrderItem by ID -> DELETE /v1/orderItem:/orderItemID**
```JSON
{
    "status": 200,
    "message": "Delete OrderItem Success",
    "data": null
}
```

``Update OrderItem by ID -> PATCH /v1/orderItem/:orderItemID**
```JSON
{
    "status": 200,
    "message": "Update OrderItem Success",
    "data": {
        "id": "475b541d-dd9c-4f83-9c97-3dd7570bb8e8",
        "orderId": "c11638ef-e0e3-4ffb-91ec-fae0ed73de05",
        "productId": "ce42a7d6-8f5b-4ebf-b20e-436b53a7eda1",
        "quantity": 5,
        "unitPrice": 5500,
        "createdAt": "2024-02-16T10:43:37.187Z",
        "updatedAt": "2024-02-16T10:44:52.304Z"
    }
}
```