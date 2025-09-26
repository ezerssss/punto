import { z } from 'zod';
import { BusinessPublicDataSchema } from './user/business';
import { Timestamp } from 'firebase/firestore';

export const ShopItemStatusEnum = z.enum(['Active', 'Inactive']);

export const ShopItemSchema = z.object({
    item_id: z.string().min(1),
    business_id: z.string().min(1),
    business: BusinessPublicDataSchema,
    item_name: z.string().min(1).max(50),
    description: z.string().max(250),
    price: z.number().nonnegative(),
    status: ShopItemStatusEnum,
    image_url: z.string().min(1),
    quantity: z.number().nonnegative(),
    date_created: z.instanceof(Timestamp),
});

export type ShopItemType = z.infer<typeof ShopItemSchema>;

export const NewShopItemRequestSchema = ShopItemSchema.omit({
    item_id: true,
    business_id: true,
    business: true,
    date_created: true,
});

export type NewShopItemRequestType = z.infer<typeof NewShopItemRequestSchema>;

export const EditShopItemRequestSchema = ShopItemSchema.omit({
    business_id: true,
    business: true,
    date_created: true,
});

export type EditShopItemRequestType = z.infer<typeof EditShopItemRequestSchema>;

export const DeleteShopItemRequestSchema = z.object({
    item_id: z.string().min(1),
});

export type DeleteShopItemRequestType = z.infer<
    typeof DeleteShopItemRequestSchema
>;
