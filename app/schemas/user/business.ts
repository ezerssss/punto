import { Timestamp } from 'firebase/firestore';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { z } from 'zod';

export const BusinessCategoryEnum = z.enum([
    'Retail and Wholesale',
    'Food and Drink',
    'Manufacturing and Production',
    'Professional Services',
    'Construction and Home Improvement',
    'Healthcare and Wellness',
    'Education and Training',
    'Technology and Digital Services',
    'Creative and Entertainment',
    'Transportation and Logistics',
    'Real Estate and Property Management',
    'Agriculture and Agribusiness',
    'Tourism and Hospitality',
    'Personal and Lifestyle Services',
    'Automotive',
]);

export const BusinessUserDataSchema = z.object({
    business_id: z.string().min(1),
    email: z.string().email(),
    business_name: z.string().min(1),
    business_category: BusinessCategoryEnum,
    phone_number: z.string().transform((arg, ctx) => {
        const phone = parsePhoneNumberFromString(arg, {
            defaultCountry: 'PH',
            extract: false,
        });

        if (phone?.isValid()) {
            return phone.number;
        }

        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid phone number',
        });
        return z.NEVER;
    }),
    photo_url: z.string().url().nullable(),
    minimum_points_payout: z.number().nonnegative(),
    points_per_peso: z.number().nonnegative(),
    date_created: z.instanceof(Timestamp),
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
