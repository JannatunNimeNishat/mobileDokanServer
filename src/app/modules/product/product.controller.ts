import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespone';
import { productServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const result = await productServices.createProductIntoDB(productData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is successfully created',
    data: result,
  });
});

const createBulkProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const result = await productServices.createBulkProductIntoDB(productData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is successfully created',
    data: result,
  });
});


const getProducts = catchAsync(async (req, res) => {
  const result = await productServices.getProductsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products are successfully fetched',
    data: result,
  });
});


const getProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await productServices.getProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is successfully fetched',
    data: result,
  });
});


const updateProduct = catchAsync(async (req, res) => {
  const {id} = req.params;
 
  const result = await productServices.updateProductIntoDB(id,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated successfully',
    data: result,
  });
});


const deleteAProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await productServices.deleteAProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is successfully deleted',
    data: result,
  });
});
const deleteMultipleProduct = catchAsync(async (req, res) => {
  const {ids} = req.body;
  const result = await productServices.deleteMultipleProductFromDB(ids);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is successfully deleted',
    data: result,
  });
});


const stockAlert = catchAsync(async (req, res) => {
  const result = await productServices.stockAlertFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products is successfully retrieved',
    data: result,
  });
});

export const productController = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteAProduct,
  createBulkProduct,
  deleteMultipleProduct,
  stockAlert
};
