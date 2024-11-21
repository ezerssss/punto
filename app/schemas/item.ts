import { z } from 'zod';

export const ItemSchema = z.object({
    item_name: z.string().min(1),
    unit_price: z.number().nonnegative(),
    quantity: z.number().positive(),
    total_price: z.number().nonnegative(),
});

export type ItemType = z.infer<typeof ItemSchema>;
