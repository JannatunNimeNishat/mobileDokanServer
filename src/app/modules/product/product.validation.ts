import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'must be an string',
      required_error: 'name is required',
    }),
    price: z.number({
      invalid_type_error: 'must be an number',
      required_error: 'price is required',
    }),
    quantity: z.number({
      invalid_type_error: 'must be an number',
      required_error: 'quantity is required',
    }),
    release_date: z.string({
      invalid_type_error: 'must be an string',
      required_error: 'release_date is required',
    }),
   /*  release_date: z.date({
      invalid_type_error: 'must be an date',
      required_error: 'release_date is required',
    }), */
    brand: z.string({
      invalid_type_error: 'must be an string',
      required_error: 'brand is required',
    }),
    model: z.string({
      invalid_type_error: 'must be an string',
      required_error: 'model is required',
    }),
    os: z.string({
      invalid_type_error: 'must be an string',
      required_error: 'os is required',
    }),
    storage_capacity: z.string({
      invalid_type_error: 'must be an string',
      required_error: 'storage_capacity is required',
    }),
    screen_size: z.number({
      invalid_type_error: 'must be an number',
      required_error: 'screen_size is required',
    }),
    camera: z.number({
      invalid_type_error: 'must be an number',
      required_error: 'camera is required',
    }),
    imageURL: z.string({
      invalid_type_error: 'must be an string',
      required_error: 'imageURL is required',
    }),
  }),
});
const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'must be an string',
    }),
    price: z
      .number({
        invalid_type_error: 'must be an number',
      })
      .optional(),
    quantity: z
      .number({
        invalid_type_error: 'must be an number',
      })
      .optional(),
    release_date: z
      .string({
        invalid_type_error: 'must be an date',
      })
      .optional(),
    brand: z
      .string({
        invalid_type_error: 'must be an string',
      })
      .optional(),
    model: z
      .string({
        invalid_type_error: 'must be an string',
      })
      .optional(),
    os: z
      .string({
        invalid_type_error: 'must be an string',
      })
      .optional(),
    storage_capacity: z
      .string({
        invalid_type_error: 'must be an string',
      })
      .optional(),
    screen_size: z
      .number({
        invalid_type_error: 'must be an number',
      })
      .optional(),
    camera: z
      .number({
        invalid_type_error: 'must be an number',
      })
      .optional(),
  }),
});

export const productValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
