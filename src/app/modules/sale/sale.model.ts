import { Schema, model } from 'mongoose';
import { TSale } from './sale.interface';

const saleSchema = new Schema<TSale>(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    imageURL: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    buyer_name: {
      type: String,
      required: true,
    },
    sale_date: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);




export const Sale = model<TSale>('Sale', saleSchema);
