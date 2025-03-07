const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const { page = "1", size = "10" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(size);
    const take = parseInt(size);

    const categories = await prisma.category.findMany({
      skip,
      take,
    });

    const total = await prisma.category.count();

    res.status(200).json({
      data: categories,
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
      .json({ message: "Error retrieving categories", error: error.message });
  }
};
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving category", error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
      },
    });

    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};
