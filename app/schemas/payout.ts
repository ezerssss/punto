import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

export const PayoutStatusEnum = z.enum([
    'Pending',
    'Processing',
    'Completed',
    'Failed',
    'Cancelled',
]);

export const PayoutSchema = z.object({
    payout_id: z.string().min(1),
    points_id: z.string().min(1),
    customer_id: z.string().min(1),
    business_id: z.string().min(1),
    points_to_redeem: z.number().positive(),
    status: PayoutStatusEnum,
    timestamp: z.instanceof(Timestamp),
});

export type PayoutType = z.infer<typeof PayoutSchema>;

export const PayoutHistorySchema = z.object({
    payout_id: z.string().min(1),
    points_redeemed: z.number().positive(),
    peso_value_redeemed: z.number().positive(),
    timestamp: z.instanceof(Timestamp),
});

export type PayoutHistoryType = z.infer<typeof PayoutHistorySchema>;
