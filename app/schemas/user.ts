import { z } from 'zod';

export const BusinessUserDataSchema = z.object({
    business_id: z.string().uuid().min(1),
    email: z.string().email(),
    business_name: z.string().min(1),
    photo_url: z.string().url().nullable(),
    points_per_peso: z.number().nonnegative(),
    date_created: z.string().datetime(),
});

export type BusinessUserType = z.infer<typeof BusinessUserDataSchema>;

export const EmployeeUserSignUpSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6), // hashed using bcrypt
});

export type EmployeeUserSignUpType = z.infer<typeof EmployeeUserSignUpSchema>;
