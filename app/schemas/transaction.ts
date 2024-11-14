import { z } from 'zod';

export const ItemSchema = z.object({
    item_name: z.string().min(1),
    unit_price: z.number().nonnegative(),
    quantity: z.number().positive(),
    total_price: z.number().nonnegative(),
});

export type ItemType = z.infer<typeof ItemSchema>;

export const TransactionSchema = z.object({
    transaction_id: z.string().min(1),
    customer_id: z.string().min(1),
    business_id: z.string().min(1),
    employee_id: z.string().min(1),
    items: ItemSchema.array().min(1),
    total_price: z.number().nonnegative(),
    points: z.number().nonnegative(),
    timestamp: z.string().datetime(),
});

export type TransactionType = z.infer<typeof TransactionSchema>;
