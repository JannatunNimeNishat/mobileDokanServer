import { Schema, model } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';

const productSchema = new Schema<TProduct, ProductModel>(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      trim: true,
      required: true,
    },
    release_date: {
      // type: Date,
      type: String,
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    model: {
      type: String,
      trim: true,
      required: true,
    },
    os: {
      type: String,
      trim: true,
      required: true,
    },
    storage_capacity: {
      type: String,
      trim: true,
      required: true,
    },
    screen_size: {
      type: Number,
      trim: true,
      required: true,
    },
    camera: {
      type: Number,
      trim: true,
      required: true,
    },
    imageURL: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//isProductAlreadyExists
productSchema.statics.isProductExists = async function (name:string) {
    const product = await Product.findOne({name:name});
    return product;
}

//not showing those products which quantity is 0 
productSchema.pre('find', function(next){
  this.find({quantity:{$ne:0}});
  next();
})
productSchema.pre('findOne', function(next){
  this.findOne({quantity:{$ne:0}});
  next();
})

export const Product = model<TProduct,ProductModel>('Product', productSchema);
