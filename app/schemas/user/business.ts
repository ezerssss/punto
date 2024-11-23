import { z } from 'zod';

export const BusinessUserDataSchema = z.object({
    business_id: z.string().min(1),
    email: z.string().email(),
    business_name: z.string().min(1),
    photo_url: z.string().url().nullable(),
    points_per_peso: z.number().nonnegative(),
    date_created: z.string().datetime(),
});

export type BusinessUserDataType = z.infer<typeof BusinessUserDataSchema>;

export const BusinessPublicDataSchema = BusinessUserDataSchema.omit({
    business_id: true,
    points_per_peso: true,
    date_created: true,
});

export type BusinessPublicDataType = z.infer<typeof BusinessPublicDataSchema>;

export const BusinessUserSignUpSchema = BusinessUserDataSchema.omit({
    business_id: true,
    date_created: true,
}).extend({ password: z.string().min(6) });

export type BusinessUserSignUpType = z.infer<typeof BusinessUserSignUpSchema>;
