import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
   const product = await Product.isProductExists(payload?.name);

  if (product) {
    if (payload.quantity <= 0) {
      throw new Error('Product quantity can not be 0 or less then 0');
    }
    product.quantity = product?.quantity + payload?.quantity;
    const result = await Product.findOneAndUpdate(
      { name: payload?.name },
      product,
      { new: true },
    );
    return result;
  }
 

  const result = await Product.create(payload);
  return result;
};

const createBulkProductIntoDB = async (payload: TProduct[]) => {
  const result = await Product.insertMany(payload);
  return result;
  
};

const getProductsFromDB = async (query: Record<string, unknown>) => {
 
  const productQueryBuilder = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
  const result = await productQueryBuilder.modelQuery;
  return result;
};

const getProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
 // console.log(payload);
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
const deleteMultipleProductFromDB = async (ids: string[]) => {
  const result = await Product.deleteMany({_id:{$in:ids}});
  if(result.deletedCount === 0){
    throw new Error('Failed to delete');
  }
   return result;

};


const stockAlertFromDB = async () => {
 
  const result = await Product.find({quantity:{$lte:5}})
  return result;
};

export const productServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductFromDB,
  updateProductIntoDB,
  deleteAProductFromDB,
  createBulkProductIntoDB,
  deleteMultipleProductFromDB,
  stockAlertFromDB
};
