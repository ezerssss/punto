import { z } from 'zod';
import { QRScanSessionSchema } from '../qr-scan-session';
import { Timestamp } from 'firebase/firestore';
import { PhoneNumberSchema } from '../phone';

export const CustomerUserDataSchema = z.object({
    customer_id: z.string().min(1),
    is_verified: z.boolean(),
    email: z.string().email(),
    full_name: z.string().min(1),
    age: z.number().positive(),
    phone_number: PhoneNumberSchema,
    photo_url: z.string().url().nullable(),
    qr_scan_session: QRScanSessionSchema.nullable(), // null if no session
    date_created: z.instanceof(Timestamp),
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

export const CustomerCompleteRegistrationSchema = CustomerSignUpSchema.omit({
    email: true,
    password: true,
});

export type CustomerCompleteRegistrationType = z.infer<
    typeof CustomerCompleteRegistrationSchema
>;
