const userService = require('../service/user.service');

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone } = req.body;
    const result = await userService.createUser(name, email, phone);
    res.status(200).send({
      status: 200,
      message: 'Create User Success',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = createUser;
