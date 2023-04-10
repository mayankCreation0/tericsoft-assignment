const express = require('express');
const { login, register } = require('../controllers/UserController');
const UserRouter = express.Router();

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
UserRouter.post('/login', asyncHandler(login));
UserRouter.post('/register', asyncHandler(register));

module.exports = UserRouter;