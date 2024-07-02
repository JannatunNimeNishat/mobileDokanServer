import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespone';
import { userService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await userService.createStudentIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

export const userController = {
  createUser,
};
