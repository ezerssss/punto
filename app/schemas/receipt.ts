import { z } from 'zod';
import { ItemSchema } from './item';

export const ReceiptPostRequestSchema = z.object({
    photo_url: z.string().url(),
});

export type ReceiptPostRequestType = z.infer<typeof ReceiptPostRequestSchema>;

export const ValidReceiptSchema = z.object({
    valid_receipt: z.literal(true),
    business_name: z.string().min(1),
    tin: z.string().min(1).nullable(),
    items: ItemSchema.array().min(1),
    total_price: z.number().nonnegative(),
});

export type ValidReceiptType = z.infer<typeof ValidReceiptSchema>;

export const InvalidReceiptSchema = z.object({
    valid_receipt: z.literal(false),
    reason: z.string().min(1),
});

export const ReceiptAnalysisResultSchema = z.union([
    ValidReceiptSchema,
    InvalidReceiptSchema,
]);

export type ReceiptAnalysisResultType = z.infer<
    typeof ReceiptAnalysisResultSchema
>;
