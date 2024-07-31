const userService = require("../service/user.service");

const getUsers = async (req, res) => {
  try {
    const result = await userService.getUsers();
    res.status(200).json({
      status: 200,
      message: "Succes get users",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed get users",
      error: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getUser(id);
    res.status(200).json({
      status: 200,
      message: "Succes get user",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed get user",
      error: err.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const result = await userService.createUser({ name, email, phone });
    res.status(200).json({
      status: 200,
      message: "Succes create user",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed create user",
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    console.log(id)
    const result = await userService.updateUser(id, { name, email, phone });
    res.status(200).json({
      status: 200,
      message: "Succes update user",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed update user",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.status(200).json({
      status: 200,
      message: "Succes delete user",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed update user",
      error: err.message,
    });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
