const express = require('express');
const { auth } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const productValidation = require('../validations/product.validation');
const productController = require('../controllers/product.controller');
const { category } = require('../../prisma');

const router = express.Router();


router
  .route('/')
  .get(
    //auth(), 
        productController.viewProduct);

router
  .route('/add')
  .get(
    //auth(),
        productController.addProduct)
  .post(
    //auth(),
    productController.postProduct)

router
  .route('/detail/:productId')
  .get(productController.detailProduct)

router
  .route('/edit/:productId')
  .get(productController.editProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct)

router
  .route('/search')
  .get(productController.searchProduct)


// router
//   .route('/:productId')
//   .get(
//     //auth(),
//      validate(productValidation.getProduct), productController.getProduct)
//   .patch(
//     //auth(),
//      validate(productValidation.updateProduct), productController.updateProduct)
//   .delete(
//     //auth(),
//      validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
