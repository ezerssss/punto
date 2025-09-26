export const BACKEND_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? 'http://localhost:5000/api/v1';

export const NEW_SHOP_ITEM_URL = `${BACKEND_BASE_URL}/business/item/new`;
export const EDIT_SHOP_ITEM_URL = `${BACKEND_BASE_URL}/business/item/edit`;
export const DELETE_SHOP_ITEM_URL = `${BACKEND_BASE_URL}/business/item/delete`;
