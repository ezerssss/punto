import { z } from 'zod';
import { ItemSchema } from './item';
import { ValidReceiptSchema } from './receipt';

export const TransactionSchema = z.object({
    transaction_id: z.string().min(1),
    customer_id: z.string().min(1),
    business_id: z.string().min(1),
    employee_id: z.string().min(1),
    items: ItemSchema.array().min(1),
    total_price: z.number().nonnegative(),
    points: z.number().nonnegative(),
    receipt_photo_url: z.string().url(),
    processed_receipt: ValidReceiptSchema,
    timestamp: z.string().datetime(),
});

export type TransactionType = z.infer<typeof TransactionSchema>;
