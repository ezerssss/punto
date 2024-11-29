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
    // I don't know pang pa ready lang for other banks and qr??
    destination_account: z.union([z.number(), z.string().min(1)]),
    timestamp: z.instanceof(Timestamp),
});

export type PayoutType = z.infer<typeof PayoutSchema>;

export const RequestPayoutSchema = z.object({
    points_id: z.string().min(1),
    points_to_redeem: z.number().positive(),
    // I don't know pang pa ready lang for other banks and qr??
    destination_account: z.union([z.number(), z.string().min(1)]),
});
