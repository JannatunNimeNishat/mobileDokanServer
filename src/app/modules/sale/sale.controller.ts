import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespone';
import { saleService } from './sale.service';

const makePayment = catchAsync(async (req, res) => {

  const result = await saleService.makePaymentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment success',
    data: result,
  });
});

const saleHistory = catchAsync(async (req, res) => {
  const { interval } = req.params;
  const result = await saleService.saleHistoryFromDB(interval as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales data retrieved successfully',
    data: result,
  });
});

const topSellingProducts = catchAsync(async(req,res)=>{
  const result = await saleService.topSellingProductsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'topSellingProducts retrieved successfully',
    data: result,
  });
})

const todaysTotalSell = catchAsync(async(req,res)=>{
  const result = await saleService.todaysTotalSellFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'todaysTotalSell retrieved successfully',
    data: result,
  });
});
const totalSell = catchAsync(async(req,res)=>{
  const result = await saleService.totalSellFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'topSellingProducts retrieved successfully',
    data: result,
  });
});

const dayBasisWeeklySell = catchAsync(async(req,res)=>{
  const result = await saleService.dayBasisWeeklySellFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'bay basis weekly sell retrieved successfully',
    data: result,
  });
});

export const saleController = {
  makePayment,
  saleHistory,
  topSellingProducts,
  totalSell,
  dayBasisWeeklySell,
  todaysTotalSell
};
