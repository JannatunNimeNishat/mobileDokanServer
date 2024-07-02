/* eslint-disable @typescript-eslint/no-explicit-any */

import { Product } from '../product/product.model';
import { TSale } from './sale.interface';
import { Sale } from './sale.model';

import { startOfWeek } from 'date-fns/startOfWeek';
import { endOfWeek } from 'date-fns/endOfWeek';

const makePaymentIntoDB = async (payload: TSale) => {
  const product = await Product.findById(payload.product_id);
 
  if (product && product?.quantity <= 0) {
    
    throw new Error('Product is out of stock');
  }
  if (!product) {
    throw new Error('Product is out of stock');
  }

  try {
    const newSale = await Sale.create(payload);
    if (!newSale) {
      throw new Error('something went wrong while creating sale');
    }
    product.quantity = product?.quantity - payload.quantity!;
    product.save();
    return { product, newSale };
  } catch (error: any) {
    throw new Error(error);
  }
};

const saleHistoryFromDB = async (interval: string) => {
  let endDate = new Date();
  let startDate;

  switch (interval) {
    case 'daily':
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();

      break;
    case 'weekly':
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 6);
      break;
    case 'monthly':
      startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

      break;
    case 'yearly':
      startDate = new Date(endDate.getFullYear(), 0, 1);
      //startDate = new Date(currentDate.getFullYear(), 0, 1);
      break;
    default:
      throw new Error('Invalid interval');
  }
  const salesHistory = await Sale.find({
    createdAt: { $gte: startDate, $lte: endDate },
  }).sort('-createdAt');
  return salesHistory;
};

const topSellingProductsFromDB = async () => {

  // getting total sells quantity
  const totalQuantity = await Sale.aggregate([
    {
      $group: {
        _id: null,
        totalQuantity: { $sum: '$quantity' },
      },
    }
  ]); 
  const totalQuantitySold = totalQuantity.length > 0 ? totalQuantity[0].totalQuantity : 0;

  const topSellingProducts = await Sale.aggregate([
    {
      $group: {
        _id: '$product_id',
        totalQuantitySold: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
    {
      $sort: { totalQuantitySold: -1 },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 1,
        totalQuantitySold: 1,
        productName: '$product.name', 
        percentage: { $multiply: [{ $divide: ['$totalQuantitySold', totalQuantitySold] }, 100] }
      }
    }
  ]);

  const totalPercentage = topSellingProducts.reduce((acc, curr) => acc + curr.percentage, 0);
  const adjustmentFactor = 100 / totalPercentage;

  topSellingProducts.forEach(product => {
    product.percentage *= adjustmentFactor;
  });


  return topSellingProducts;
};

const todaysTotalSellFromDB = async () => {
  const today = new Date();
  today.setHours(0,0,0,0);

  const result = await Sale.aggregate([
    {
      $match:{
        createdAt:{$gte:today}
      }
    },
    {
      $group: {
        _id: null,
        totalSell: { $sum: '$price' },
      },
    }
  ]);
  
const totalSalesToday  = result?.length > 0 ? result[0].totalSell : 0;
  return totalSalesToday ;
};
const totalSellFromDB = async () => {
  const totalSellAmount = await Sale.aggregate([
    {
      $group: {
        _id: null,
        totalSell: { $sum: '$price' },
      },
    },
    {
      $project: {
        totalSell: 1,
      },
    },
  ]);

  return totalSellAmount;
};

const dayBasisWeeklySellFromDB = async () => {
  const today = new Date();
  const startDay = startOfWeek(today);
  const endDay = endOfWeek(today);

  const result = await Sale.aggregate([
    {
      $match: {
        createdAt: { $gte: startDay, $lte: endDay },
      },
    },
    {
      $group: {
        _id: { $dayOfWeek: '$createdAt' }, 
        totalSales: { $sum: '$price' }, 
      },
    },
    {
      $project: {
        dayOfWeek: {
          $switch: {
            branches: [
              { case: { $eq: ['$_id', 1] }, then: 'Sunday' },
              { case: { $eq: ['$_id', 2] }, then: 'Monday' },
              { case: { $eq: ['$_id', 3] }, then: 'Tuesday' },
              { case: { $eq: ['$_id', 4] }, then: 'Wednesday' },
              { case: { $eq: ['$_id', 5] }, then: 'Thursday' },
              { case: { $eq: ['$_id', 6] }, then: 'Friday' },
              { case: { $eq: ['$_id', 7] }, then: 'Saturday' },
            ],
            default: 'Unknown',
          },
        },
        totalSales: { $round: ['$totalSales', 2] }, // Round total sales to two decimal places
        _id: 0,
      },
    },
    {
      $sort: { dayOfWeek: 1 } // Sort by day of the week (Sunday: 1, Monday: 2, etc.)
    }
  ]);

  return result;

};

export const saleService = {
  makePaymentIntoDB,
  saleHistoryFromDB,
  topSellingProductsFromDB,
  totalSellFromDB,
  dayBasisWeeklySellFromDB,
  todaysTotalSellFromDB
};
