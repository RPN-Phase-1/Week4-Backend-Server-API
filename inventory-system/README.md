# Inventory-System Backend API Documentation

Welcome to the Inventory System Backend API documentation. This API serves as the backend for an inventory management system, allowing role user to manage products and category, and role admin to manage users, orders and order-items efficiently. The API provides various endpoints to perform CRUD operations on products, orders, categories, and order-items.

**Key Features:**

- Product and Category Management (Role: User):
    - Users with the role "user" can perform CRUD operations on products and categories. This includes adding, updating, editing, deleting, and retrieving product and category information.
- User, OrderItem, and Order Management (Role: Admin):
    - Users with the role "admin" have access to perform CRUD operations on all the tables include users, order-items, and orders. This includes managing user accounts, order-items, and orders within the system.

**Base URL:**

```
http://localhost:3000/v1/api-endpoints 
```

**Authentication:**

To use the application, you must first create an account, then you can login with the email and password you just created. You can also request to refresh the token and also logout. Endpoints:

1. ***Register***
    - Endpoint URL: ```/auth/register```
    - Description: This endpoint allows user to register and create a new account in the system. The default role is user.
    - Need a Bearer Token to access: ```false```
    - HTTP Methods: 
        - ```POST```: Create a new user
    - Request Body: 
        - email
        - password
        - name
    - Request Parameters: ```NULL```
    - Request Query: ```NULL```
    - Response Format: 
        - ```201 Created``` for successfull request
        - Response body contains data user, access and refresh JWT token in JSON format
2. ***Login***
    - Endpoint URL: ```/auth/login```
    - Description: You can try logging in to start using the application on this endpoint.
    - Need a Bearer Token to access: ```false```
    - HTTP Methods:
        - ```POST```: Authenticate user credentials for login
    - Request Body: 
        - email
        - password
    - Request Parameters: ```NULL```
    - Request Query: ```NULL```
    - Response Format:
        - ```200 OK``` for successfullt request
        - Response body contains data user and new access and refresh JWT token in JSON format
3. ***Refresh Token***
    - Endpoint URL: ```/auth/refresh-token```
    - Description: You can refresh an expired JWT token by passing the JWT refresh token to request body on this endpoint.
    - Need a Bearer Token to access: ```false```
    - HTTP Methods:
        - ```POST```: Refresh the JWT token using the refresh token
    - Request Body: 
        - token (refresh token)
    - Request Parameters: ```NULL```
    - Request Query: ```NULL```
    - Response Format: 
        - ```200 OK``` for successfull request
        - Response body contains new access and refresh JWT token in JSON format
4. ***Logout***
    - Endpoint URL: ```/auth/logout```
    - Description: Endpoint for deleting the JWT token in the database, even if the JWT token is deleted in the database, the JWT token can still be used until the access token expires.
    - Need a Bearer Token to access: ```true```
    - HTTP Methods:
        - ```POST```: Invalidate the JWT token in the database
    - Request Body: ```NULL```
    - Request Parameters: ```NULL```
    - Request Query: ```NULL```
    - Response Format:
        - ```200 OK``` for successfull request
        - Response body contains a success message and null data in JSON format




