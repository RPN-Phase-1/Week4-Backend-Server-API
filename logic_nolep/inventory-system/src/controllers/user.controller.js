const userService = require("../services/user.service");
const { userValidationSchema } = require("../validations/user.validation");
const handleResponse = require("../utils/responseHandler");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    handleResponse(res, 200, "Success get users!", users);
  } catch (err) {
    handleResponse(res, 500, "Failed to get users!", null, err.message);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    handleResponse(res, 200, "Success get user!", user);
  } catch (err) {
    handleResponse(res, 500, "Failed to get user!", null, err.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { error } = userValidationSchema.validate(req.body);
    const allUsers = await userService.getUsers();
    const isEmailTaken = allUsers.some((cat) => cat.email === email);

    if (error) {
      return handleResponse(res, 400, "Validation Error", null, error.details[0].message);
    }

    if (isEmailTaken) {
      return handleResponse(res, 400, "User email already exists.");
    }

    const createdUser = await userService.createUser({
      name,
      email,
      password,
      role,
    });

    handleResponse(res, 200, "Success create user!", createdUser);
  } catch (err) {
    handleResponse(res, 500, "Failed to create user!", null, err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password, role } = req.body;
    const { error } = userValidationSchema.validate(req.body);
    const existingUser = await userService.getUser(userId);
    const isEmailChanged = email && email !== existingUser.email;

    if (error) {
      return handleResponse(res, 400, "Validation Error", null, error.details[0].message);
    }

    if (!existingUser) {
      return handleResponse(res, 404, "User not found.");
    }

    if (isEmailChanged) {
      const allUsers = await userService.getUsers();
      const isEmailTaken = allUsers.some((user) => user.email === email);

      if (isEmailTaken) {
        return handleResponse(res, 400, "User email already exists.");
      }
    }

    const updatedUser = await userService.updateUser(userId, {
      name,
      email,
      password,
      role,
    });
    
    handleResponse(res, 200, "Success update user!", updatedUser);
  } catch (err) {
    handleResponse(res, 500, "Failed to update user!", null, err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    handleResponse(res, 200, "Success delete user!", deletedUser);
  } catch (err) {
    handleResponse(res, 500, "Failed to delete user!", null, err.message);
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
