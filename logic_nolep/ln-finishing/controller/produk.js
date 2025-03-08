const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    if (stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        categoryId: parseInt(categoryId),
      },
      include: {
        category: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const { page = "1", size = "10" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(size);
    const take = parseInt(size);

    const products = await prisma.product.findMany({
      skip,
      take,
      include: {
        category: true,
      },
    });

    const total = await prisma.product.count();

    res.status(200).json({
      data: products,
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
      .json({ message: "Error retrieving products", error: error.message });
  }
};

exports.searchProductsByCategory = async (req, res) => {
  try {
    const { search, page = "1", size = "10" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(size);
    const take = parseInt(size);

    if (!search) {
      return res.status(400).json({ message: "Search parameter is required" });
    }

    const products = await prisma.product.findMany({
      where: {
        category: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      skip,
      take,
      include: {
        category: true,
      },
    });

    const total = await prisma.product.count({
      where: {
        category: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    });

    res.status(200).json({
      data: products,
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
      .json({ message: "Error searching products", error: error.message });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = parseFloat(price);
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (categoryId) updateData.categoryId = parseInt(categoryId);

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        category: true,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
