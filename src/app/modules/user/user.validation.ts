import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(30),
    email: z.string().email(),
    password: z.string(),
  })
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(30).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role:z.string().optional()
  })
});





export const userValidations = {
  createUserValidationSchema,
  updateUserValidationSchema
};
