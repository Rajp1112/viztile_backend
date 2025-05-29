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
  phone: z
    .string({ required_error: 'Phone is required' })
    .trim()
    .min(10, { message: 'Phone must be at least of 10 chars' })
    .max(20, { message: 'Phone Must not more then 20 chars' }),
  password: z
    .string({ required_error: 'Password is required' })

    .min(6, { message: 'Password must be at least of 6 chars' })
    .max(1024, { message: 'Password Must not more then 1024 chars' }),

  country: z
    .string({ required_error: 'Country is required' })
    .trim()
    .min(3, { message: 'Country must be at least of 3 chars' })
    .max(255, { message: 'Country Must not more then 255 chars' }),
});

module.exports = signupSchema;
