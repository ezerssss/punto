import { z } from 'zod';

export const ShopItemFormSchema = z.object({
    item_name: z.string().min(1).max(50),
    description: z.string().min(0).max(250),
    price: z.coerce.number({ message: 'Enter a valid number.' }).nonnegative(),
    quantity: z.coerce
        .number({ message: 'Enter a valid number.' })
        .nonnegative(),
    status: z.enum(['Active', 'Inactive']),
});

export type ShopItemFormType = z.infer<typeof ShopItemFormSchema>;
