const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, status = "PENDING" } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Order must contain at least one item" });
    }

    const result = await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          userId: parseInt(userId),
          status,
          orderItems: {
            create: [],
          },
        },
      });

      let totalAmount = 0;

      for (const item of items) {
        const { productId, quantity } = item;

        const product = await prisma.product.findUnique({
          where: { id: parseInt(productId) },
        });

        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }

        if (product.stock < quantity) {
          throw new Error(
            `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${quantity}`
          );
        }

        await prisma.product.update({
          where: { id: parseInt(productId) },
          data: {
            stock: {
              decrement: quantity,
            },
          },
        });

        const itemTotal = product.price * quantity;
        totalAmount += itemTotal;

        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: parseInt(productId),
            quantity: parseInt(quantity),
            price: product.price,
            totalPrice: itemTotal,
          },
        });
      }

      const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          totalAmount,
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return updatedOrder;
    });

    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const { page = "1", size = "10" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(size);
    const take = parseInt(size);

    const orders = await prisma.order.findMany({
      skip,
      take,
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.order.count();

    res.status(200).json({
      data: orders,
      meta: {
        total,
        page: parseInt(page),
        size: parseInt(size),
        totalPages: Math.ceil(total / parseInt(size)),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving orders", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving order", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"];

    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({
          message:
            "Invalid status. Must be one of: " + validStatuses.join(", "),
        });
    }

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (status === "CANCELLED") {
      for (const item of order.orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }
    }

    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await prisma.$transaction(async (prisma) => {
      if (order.status !== "CANCELLED") {
        for (const item of order.orderItems) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }
      }

      await prisma.orderItem.deleteMany({
        where: { orderId: parseInt(id) },
      });

      await prisma.order.delete({
        where: { id: parseInt(id) },
      });
    });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};
