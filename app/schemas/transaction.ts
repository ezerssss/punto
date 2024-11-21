import { z } from 'zod';
import { ValidReceiptSchema } from './receipt';
import {
    BusinessPublicDataSchema,
    EmployeePublicDataSchema,
    CustomerPublicDataSchema,
} from './user';

export const TransactionSchema = z.object({
    transaction_id: z.string().min(1),
    customer_id: z.string().min(1),
    business_id: z.string().min(1),
    employee_id: z.string().min(1),
    total_price: z.number().nonnegative(),
    points: z.number().nonnegative(),
    receipt_photo_url: z.string().url(),
    processed_receipt: ValidReceiptSchema,
    business: BusinessPublicDataSchema,
    employee: EmployeePublicDataSchema,
    customer: CustomerPublicDataSchema,
    timestamp: z.string().datetime(),
});

export type TransactionType = z.infer<typeof TransactionSchema>;
