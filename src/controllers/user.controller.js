const { userService, tokenService } = require('../services');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const create = catchAsync(async (req, res) => {
  const existingEmail = await userService.getByEmail(req.body.email);

  if (existingEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
  }

  const userCreated = await userService.create(req.body);

  const tokens = await tokenService.generateAuthTokens(userCreated);

  res.status(httpStatus.CREATED).json({
    status: httpStatus.CREATED,
    message: 'Register Success',
    data: { userCreated, tokens },
  });
});

const queryUsers = catchAsync(async (req, res) => {
  const { name, role, page, limit, sort } = req.query;
  const filters = {
    name,
    role,
  };

  const options = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sort,
  };

  options.skip = (options.page - 1) * options.take;

  const users = await userService.queryUsers(filters, options);

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Get All Users Success',
    data: users,
    page: 1,
  });
});

const getById = catchAsync(async (req, res) => {
  const user = await userService.getById(req.params.userId);

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Get User By Id Success',
    data: user,
  });
});

const update = catchAsync(async (req, res) => {
  const userUpdated = await userService.update(req.params.userId, req.body);

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Update User Success',
    data: userUpdated,
    meta: {
      page: 1,
    },
  });
});

const del = catchAsync(async (req, res) => {
  await userService.del(req.params.userId);

  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'Delete User Success',
  });
});

module.exports = {
  create,
  queryUsers,
  getById,
  update,
  del,
};
