const httpStatus = require('http-status');
const prisma = require('../../prisma/client')
const ApiError = require('../utils/ApiError');

/**
 * Create a orderitem
 * @param {Object} orderItemBody
 * @returns {Promise<OrderItem>}
 */
const createOrderItem = async (orderItemBody) => {

    
    const currentProduct = await prisma.product.findUnique({
        where:{
            id: orderItemBody.productId,
        },
    })

    const currentOrder = await prisma.order.findUnique({
        where:{
            id: orderItemBody.orderId,
        },
    })

    if(!currentProduct) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    if(!currentOrder) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }


    if(orderItemBody.quantity > currentProduct.quantityInStock){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient stock');
    }

    const updatedProduct = await prisma.product.update({
        where: {
          id: orderItemBody.productId,
        },
        data: {
          quantityInStock: currentProduct.quantityInStock - orderItemBody.quantity,
        },
      });
    
    if(!updatedProduct) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update product stock');
    }


    const totalPriceProduct = orderItemBody.quantity * orderItemBody.unitPrice;
    const totalPriceOrder = totalPriceProduct + currentOrder.totalPrice;

    const updatedOrder = await prisma.order.update({
        where:{
            id: orderItemBody.orderId,
        },
        data:{
            totalPrice: totalPriceOrder,
        }
    })

    if(!updatedOrder) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update order total price');
    }

    const createdOrderItem = await prisma.orderItem.create({
        data: orderItemBody,
    });

    return createdOrderItem;




//   return prisma.orderItem.create({
//     data: orderItemBody
//   });
};

/**
 * Query for orderItems
 * @returns {Promise<QueryResult>}
 */
const queryOrderItems = async (filter, options) => {
  const orderItems = await prisma.orderItem.findMany();
  return orderItems;
};

/**
 * Get orderItem by id
 * @param {ObjectId} id
 * @returns {Promise<OrderItem>}
 */
const getOrderItemById = async (id) => {
  return prisma.orderItem.findFirst({
    where: {
      id: id
    }
  })
};

/**
 * Update orderItem by id
 * @param {ObjectId} orderItemId
 * @param {Object} updateBody
 * @returns {Promise<OrderItem>}
 */
const updateOrderItemById = async (orderItemId, updateBody) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'orderItem not found');
  }

  const currentProduct = await prisma.product.findUnique({
    where:{
      id: updateBody.productId
    }
  })

  const currentOrder = await prisma.order.findUnique({
    where:{
      id: updateBody.orderId
    }
  })

  if(!currentProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  if(!currentOrder) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  if(updateBody.quantity > currentProduct.quantityInStock ){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient stock');
  }


  // const updatedQuantity = await prisma.product.update({
  //   where: {
  //     id: updateBody.productId,
  //   },
  //   data: {
  //     quantityInStock: currentProduct.quantityInStock - (updateBody.quantity + orderItem.quantity) ,
      
  //   },
  // });

  // if(!updatedQuantity){
  //   throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update product stock');
  // }


 //  const totalPriceProduct =  ;
  // const totalPriceOrder = totalPriceProduct + currentOrder.totalPrice;
  console.log("quantityinstocksaatini", currentProduct.quantityInStock)
  console.log("inputquantity", updateBody.quantity)
  console.log("orderitemquantitysaatini", orderItem.quantity)
  console.log("orderitemquantitysesudah", updateBody.quantity)
  console.log("quantityproductsesudah",(orderItem.quantity+currentProduct.quantityInStock)-updateBody.quantity)

  console.log("totalpriceorderITEMsaatini", orderItem.quantity*orderItem.unitPrice)
  console.log("totalpriceordersaatini", currentOrder.totalPrice)
  console.log("totalpricesesudah", updateBody.quantity*updateBody.unitPrice);
  // console.log("totalpriceordercurrent", currentOrder.totalPrice );
  // console.log("totalpriceorderupdate", currentOrder.totalPrice + (updateBody.quantity*updateBody.unitPrice) );
  
 // console.log("totalprice", )
  //console.log("totalpriceorder", totalPriceOrder)
  // const updatedOrder = await prisma.order.update({
  //   where:{
  //       id: updateBody.orderId,
  //   },
  //   data:{
  //       totalPrice: totalPriceOrder,
  //   }
  // })

  // if(!updatedOrder) {
  //     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update order total price');
  // }



  
  // const updatedOrderItem = await prisma.orderItem.update({
  //   where: {
  //     id: orderItemId,
  //   },
  //   data: updateBody
  // })

  // return updatedOrderItem;
};

/**
 * Delete orderitem by id
 * @param {ObjectId} orderItemId
 * @returns {Promise<OrderItem>}
 */
const deleteOrderItemById = async (orderItemId) => {
  const orderItem = await getOrderItemById(orderItemId);
  if (!orderItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'orderItem not found');
  }
  const productId = orderItem.productId;
  const orderId = orderItem.orderId;

  const updatedQuantity = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      quantityInStock: {
        increment: orderItem.quantity,
      },
    },
  });

  if(!updatedQuantity){
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update product stock');
  }


  const deletedProductPrice = orderItem.quantity * orderItem.unitPrice

  const updatedTotalPrice = await prisma.order.update({
    where:{
      id: orderId,
    },
    data:{
      totalPrice:{
        decrement: deletedProductPrice
      }
    }
  })

  if(!updatedTotalPrice){
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update total price order');
  }

  
  const deletedOrderItems = await prisma.orderItem.deleteMany({
    where: {
      id: orderItemId,
    },
  });

  return deletedOrderItems;

};

module.exports = {
  createOrderItem,
  queryOrderItems,
  getOrderItemById,
  updateOrderItemById,
  deleteOrderItemById,
};