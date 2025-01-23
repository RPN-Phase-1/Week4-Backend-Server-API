const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const { authValidationSchema } = require("../validations/auth.validation");
const handleResponse = require("../utils/responseHandler");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { error } = authValidationSchema.validate(req.body);
    const allUsers = await userService.getUsers();
    const isEmailTaken = allUsers.some((cat) => cat.email === email);
    
    if (error) {
      return handleResponse(res, 400, "Validation Error", null, error.details[0].message);
    }

    if (isEmailTaken) {
      return handleResponse(res, 400, "User email already exists.");
    }

    const user = await authService.register({ name, email, password, role });
    handleResponse(res, 200, "Registration successful!", user);
  } catch (err) {
    handleResponse(res, 500, "Registration failed!", null, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = authValidationSchema.validate(req.body);

    if (error) {
      return handleResponse(res, 400, "Validation Error", null, error.details[0].message);
    }

    const { token, user } = await authService.login({ email, password });
    handleResponse(res, 200, "Login successful!", { token, user });
  } catch (err) {
    handleResponse(res, 500, "Login failed!", null, err.message);
  }
};

module.exports = { register, login };
