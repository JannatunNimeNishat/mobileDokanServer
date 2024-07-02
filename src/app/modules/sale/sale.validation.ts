import { z } from 'zod';

const createSaleValidationSchema = z.object({
  body: z.object({
    product_id: z.string({
      invalid_type_error: 'product_id must be a string',
      required_error: 'product_id is required',
    }),
    productName: z.string({
      invalid_type_error: 'must be an string',
      required_error: 'productName is required',
    }),
    imageURL: z.string({
      invalid_type_error: 'must be an string',
      required_error: 'imageURL is required',
    }),
    quantity: z.number({
      invalid_type_error: 'quantity must be a number',
      required_error: 'quantity is required',
    }),
    buyer_name: z.string({
      invalid_type_error: 'buyer_name must be a string',
      required_error: 'buyer_name is required',
    }),
    sale_date: z.string({
      invalid_type_error: 'sale_date must be a string',
      required_error: 'sale_date is required',
    }),
    price: z.number({
      invalid_type_error: 'price must be a number',
      required_error: 'price is required',
    }),
  })
})

export const saleValidations = {
  createSaleValidationSchema,
};
