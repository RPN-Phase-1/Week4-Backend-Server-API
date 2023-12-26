module.exports.authService = require('./auth.service');
module.exports.tokenService = require('./token.service');
module.exports.userService = require('./user.service');
module.exports.categoryService = require('./category.service');
module.exports.productService = require('./product.service');
module.exports.orderService = require('./order.service');
module.exports.orderItemService = require('./orderItem.service')

// User API:
// Create User: POST /api/users
// Get All Users: GET /api/users
// Get User by ID: GET /api/users/{userId}
// Update User: PUT /api/users/{userId}
// Delete User: DELETE /api/users/{userId}

// Auth API: (For authentication purposes)
// User Login: POST /api/auth/login
// User Logout: POST /api/auth/logout
// User Register: POST /api/auth/register

// Product API:
// Create Product: POST /api/products
// Get All Products: GET /api/products
// Get Product by ID: GET /api/products/{productId}
// Update Product: PUT /api/products/{productId}
// Delete Product: DELETE /api/products/{productId}
// Get Products by User: GET /api/users/{userId}/products

// Category API:
// Create Category: POST /api/categories
// Get All Categories: GET /api/categories
// Get Category by ID: GET /api/categories/{categoryId}
// Update Category: PUT /api/categories/{categoryId}
// Delete Category: DELETE /api/categories/{categoryId}

// Order API:
// Create Order: POST /api/orders
// Get All Orders: GET /api/orders
// Get Order by ID: GET /api/orders/{orderId}
// Update Order: PUT /api/orders/{orderId}
// Delete Order: DELETE /api/orders/{orderId}
// Get Orders by User: GET /api/users/{orderId}/orders

// OrderItem API:
// Create OrderItem: POST /api/order-items
// Get All OrderItems: GET /api/order-items
// Get OrderItem by ID: GET /api/order-items/{orderItemId}
// Update OrderItem: PUT /api/order-items/{orderItemId}
// Delete OrderItem: DELETE /api/order-items/{orderItemId}
// Get OrderItems by Order: GET /api/orders/{orderId}/order-items
