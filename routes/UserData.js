const express = require('express');
const {getUserHistory , getDetails} = require('../controllers/UserController')
const {bmiCalculation} = require('../controllers/BmiController')
const auth = require('../Middlewares/Middleware');
const DataRouter = express.Router();

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

DataRouter.get('/profile/:id', auth, asyncHandler(getDetails));
DataRouter.get('/history',auth, asyncHandler(getUserHistory));
DataRouter.post('/bmi-calulation',auth, asyncHandler(bmiCalculation));

module.exports = DataRouter;