import { z } from 'zod';
import { QRScanSessionSchema } from './qr-scan-session';
import parsePhoneNumberFromString from 'libphonenumber-js';

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

export const EmployeeUserDataSchema = z.object({
    employee_id: z.string().min(1),
    business_id: z.string().min(1),
    username: z.string().min(1),
    password: z.string().min(6), // hashed using bcrypt
    date_created: z.string().datetime(),
});

export type EmployeeUserDataType = z.infer<typeof EmployeeUserDataSchema>;

export const EmployeePublicDataSchema = z.object({
    username: z.string().min(1),
});

export type EmployeePublicDataType = z.infer<typeof EmployeePublicDataSchema>;

export const EmployeeUserSignUpSchema = EmployeeUserDataSchema.omit({
    business_id: true,
    employee_id: true,
    date_created: true,
}).extend({ password: z.string().min(6) });

export type EmployeeUserSignUpType = z.infer<typeof EmployeeUserSignUpSchema>;

export const EmployeeLoginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
});

export type EmployeeLoginType = z.infer<typeof EmployeeLoginSchema>;

export const CustomerUserDataSchema = z.object({
    customer_id: z.string().min(1),
    is_verified: z.boolean(),
    email: z.string().email(),
    full_name: z.string().min(1),
    age: z.number().positive(),
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
    qr_scan_session: QRScanSessionSchema.nullable(), // null if no session
    date_created: z.string().datetime(),
});

export type CustomerUserDataType = z.infer<typeof CustomerUserDataSchema>;

export const CustomerPublicDataSchema = CustomerUserDataSchema.omit({
    customer_id: true,
    is_verified: true,
    email: true,
    phone_number: true,
    qr_scan_session: true,
    date_created: true,
});

export type CustomerPublicDataType = z.infer<typeof CustomerPublicDataSchema>;

export const CustomerSignUpSchema = CustomerUserDataSchema.omit({
    customer_id: true,
    is_verified: true,
    qr_scan_session: true,
    date_created: true,
}).extend({ password: z.string().min(6) });

export type CustomerSignUpType = z.infer<typeof CustomerSignUpSchema>;
