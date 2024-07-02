import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespone';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await authServices.loginUserIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    data: { token: result },
  });
});

export const authControllers = {
  loginUser,
};
