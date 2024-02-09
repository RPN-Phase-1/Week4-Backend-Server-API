const express = require('express');
const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidation.createProduct), productController.createProduct)
  .get(auth(), productController.getProducts);

router
  .route('/:productId')
  .get(auth(), validate(productValidation.getProduct), productController.getProduct)
  .patch(auth(), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth(), validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - quantityInStock
 *         - categoryId
 *         - userId
 *       properties:
 *         name:
 *           type: string
 *           description: The name of product
 *         description:
 *           type: string
 *           description: The description of product
 *         price:
 *           type: float
 *           description: The price of product
 *         quantityInStock:
 *           type: int
 *           description: The quantityInStock of product
 *         categoryId:
 *           type: uuid
 *           description: The category of product
 *         userId:
 *           type: uuid
 *           description: The user who input the product
 */


/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The Product managing API
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       '201':
 *         description: Product Created
 *         content:
 *           application/json:
 *             example:
 *                 status: 201
 *                 message: "Create Product Success"
 *                 data: 
 *                  id: "5d3a5a9e-bd2b-4e9b-9cae-1e807f6ff8ec"
 *                  name:  "baju kenjo"
 *                  description: "baju keren merk kenjo"
 *                  price: 100000
 *                  quantityInStock: 25
 *                  categoryId: "6c448130-6036-4535-acac-b7c2384e8a34"
 *                  userId: "40490dd6-502a-4183-a595-a38616c2c477" 
 *                  createdAt: "2024-02-03T13:55:35.124Z"
 *                  updatedAt: "2024-02-03T13:55:35.124Z"
 *       '400':
 *         description: Data Invalid
 *         content:
 *           application/json:
 *             example:
 *                  status: 400
 *                  message: "\"name\" is required, \"price\" is required, \"quantityInStock\" is required, \"description\" is required"
 *                  stack: "Error: \"name\" is required, \"price\" is required, \"quantityInStock\" is required, \"description\" is required\n at"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *                  status: 401
 *                  message: "Please authenticate"
 *                  stack: "Error: Please authenticate\n at"
 *
 *   get:
 *     summary: get all product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product Created
 *         content:
 *           application/json:
 *             example:
 *                 status: 200
 *                 message: "Get Products Success"
 *                 data:
 *                  id: "5d3a5a9e-bd2b-4e9b-9cae-1e807f6ff8ec"
 *                  name:  "baju kenjo"
 *                  description: "baju keren merk kenjo"
 *                  price: 100000
 *                  quantityInStock: 25
 *                  categoryId: "6c448130-6036-4535-acac-b7c2384e8a34"
 *                  userId: "40490dd6-502a-4183-a595-a38616c2c477" 
 *                  createdAt: "2024-02-03T13:55:35.124Z"
 *                  updatedAt: "2024-02-03T13:55:35.124Z"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *                  status: 401
 *                  message: "Please authenticate"
 *                  stack: "Error: Please authenticate\n at"
 * /product/id:
 *   patch:
 *     summary: Update a product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product Updated
 *         content:
 *           application/json:
 *             example:
 *                 status: 200
 *                 message: "Update Product Success"
 *                 data:
 *                  id: "5d3a5a9e-bd2b-4e9b-9cae-1e807f6ff8ec"
 *                  name:  "baju polo"
 *                  description: "baju keren merk polo"
 *                  price: 2500
 *                  quantityInStock: 30
 *                  categoryId: "6c448130-6036-4535-acac-b7c2384e8a34"
 *                  userId: "40490dd6-502a-4183-a595-a38616c2c477" 
 *                  createdAt: "2024-02-03T13:55:35.124Z"
 *                  updatedAt: "2024-02-03T13:55:35.124Z"
 *       '400':
 *         description: Data Invalid
 *         content:
 *           application/json:
 *             example:
 *                 status: 400
 *                 message: "\"body\" must have at least 1 key"
 *                 stack: "Error: \"body\" must have at least 1 key\n at"          
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *                 status: 401
 *                 message: "Please authenticate"
 *                 stack: "Error: Please authenticate\n at"
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *                 status: 404
 *                 message: "Not found"
 *                 stack: "Error: Not found\n at"
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product Updated
 *         content:
 *           application/json:
 *             example:
 *                 status: 200
 *                 message: "Delete Product Success"
 *                 data: null        
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *                 status: 401
 *                 message: "Please authenticate"
 *                 stack: "Error: Please authenticate\n at"
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *                 status: 404
 *                 message: "Not found"
 *                 stack: "Error: Not found\n at"
 */

