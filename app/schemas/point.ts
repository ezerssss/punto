import { z } from 'zod';

export const PointSchema = z.object({
    points_id: z.string().min(1),
    customer_id: z.string().min(1),
    business_id: z.string().min(1),
    current_points: z.number().nonnegative(), // points without considering pending stuff
    available_points: z.number().nonnegative(), // points considering pending stuff
});

export type PointType = z.infer<typeof PointSchema>;

export const EarnHistorySchema = z.object({
    transaction_id: z.string().min(1),
    points_earned: z.number().positive(),
    timestamp: z.string().datetime(),
});

export type EarnHistoryType = z.infer<typeof EarnHistorySchema>;
