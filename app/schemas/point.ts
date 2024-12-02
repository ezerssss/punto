import { z } from 'zod';
import { BusinessPublicDataSchema } from './user/business';
import { CustomerPublicDataSchema } from './user/customer';
import { Timestamp } from 'firebase/firestore';

export const PointSchema = z.object({
    points_id: z.string().min(1),
    customer_id: z.string().min(1),
    business_id: z.string().min(1),
    current_points: z.number().nonnegative(), // points without considering pending stuff
    available_points: z.number().nonnegative(), // points considering pending stuff
    business: BusinessPublicDataSchema,
    customer: CustomerPublicDataSchema,
});

export type PointType = z.infer<typeof PointSchema>;

export const EarnHistorySchema = z.object({
    transaction_id: z.string().min(1),
    customer_id: z.string().min(1),
    business_id: z.string().min(1),
    points_earned: z.number().positive(),
    total_price: z.number().nonnegative(),
    timestamp: z.instanceof(Timestamp),
});

export type EarnHistoryType = z.infer<typeof EarnHistorySchema>;
