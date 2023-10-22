const userService = require("../service/user.service");

const getUser = async (req, res) => {
  try {
    const result = await userService.getData();
    res.status(200).send({
      status: 200,
      message: "Get User Success",
      data: result,
    });
  } catch {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;
    let result = await userService.createData(
      body.name,
      body.phone,
      body.email
    );
    res.status(200).json({
      status: 200,
      message: "Success Create New User",
      data: body,
    });
  } catch {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const findUser = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await userService.findData(id);
    res.status(200).json({
      status: 200,
      message: "Success Find User",
      data: result
    });
  } catch {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    let updatedData = await userService.updateData(
      id,
      body.name,
      body.phone,
      body.email
    );
    res.status(200).json({
      status: 200,
      message: "Success Update User",
      data: updatedData
    });
  } 
  catch {
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    let deletedUser = await userService.deleteData(id);
    res.status(200).json({
        status: 200,
        message: "Success Delete User",
        data: deletedUser
      });
  } catch {
    res.status(500).send({
        status: 500,
        message: "Internal Server Error",
        error: error.message
      });
  }
};

module.exports = { getUser, deleteUser, findUser, createUser, updateUser};
