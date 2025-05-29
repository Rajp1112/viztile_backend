const { z } = require('zod');

const signupSchema = z.object({
  username: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(3, { message: 'Name must be at least of 3 chars' })
    .max(255, { message: 'Name Must not more then 255 chars' }),
  email: z
    .string({ required_error: 'Email is Required' })
    .trim()
    .email({ message: 'Invalid email address' })
    .min(3, { message: 'Email must be at least of 3 chars' })
    .max(255, { message: 'Email Must not more then 255 chars' }),
  address: z
    .string({ required_error: 'Address is required' })
    .trim()
    .min(3, { message: 'Address must be at least of 3 chars' })
    .max(255, { message: 'Address Must not more then 255 chars' }),

  country: z
    .string({ required_error: 'Country is required' })
    .trim()
    .min(3, { message: 'Country must be at least of 3 chars' })
    .max(255, { message: 'Country Must not more then 255 chars' }),

  city: z
    .string({ required_error: 'City is required' })
    .trim()
    .min(3, { message: 'City must be at least of 3 chars' })
    .max(255, { message: 'City Must not more then 255 chars' }),

  postal_code: z
    .string({ required_error: 'Postal code is required' })
    .trim()
    .min(3, { message: 'Postal code must be at least of 3 chars' })
    .max(20, { message: 'Postal code Must not more then 20 chars' }),
  phone: z
    .string({ required_error: 'Phone is required' })
    .trim()
    .min(10, { message: 'Phone must be at least of 10 chars' })
    .max(20, { message: 'Phone Must not more then 20 chars' }),

  password: z
    .string({ required_error: 'Password is required' })

    .min(6, { message: 'Password must be at least of 6 chars' })
    .max(1024, { message: 'Password Must not more then 1024 chars' }),
});

module.exports = signupSchema;
