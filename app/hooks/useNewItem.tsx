import { toastError } from '@/lib/utils';
import { useState } from 'react';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import { ShopItemFormType } from '../schemas/forms/shop';
import { NEW_SHOP_ITEM_URL } from '../constants/url';
import { NewShopItemRequestType } from '../schemas/shop';
import useUpload from './useUpload';
import { ref } from 'firebase/storage';
import { storage } from '../firebase/storage';
import useUser from './useUser';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

function useNewItem() {
    const [isLoading, setIsLoading] = useState(false);
    const { uploadPicture } = useUpload();
    const { user } = useUser();

    async function createNewItem(
        item: ShopItemFormType,
        imageFile: ArrayBuffer
    ) {
        if (!user) {
            return;
        }

        try {
            const log = await analytics;

            if (log) {
                logEvent(log, 'business-portal:new-item');
            }

            setIsLoading(true);

            const pictureUid = uuidv4();
            const itemPictureRef = ref(
                storage,
                `items/${user.uid}/${pictureUid}.jpeg`
            );
            const photoUrl = await uploadPicture(itemPictureRef, imageFile);

            const newItemRequest: NewShopItemRequestType = {
                ...item,
                image_url: photoUrl,
            };

            const idToken = await user.getIdToken(true);

            const res = await fetch(NEW_SHOP_ITEM_URL, {
                method: 'POST',
                body: JSON.stringify(newItemRequest),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${idToken}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            toast.success(data.message);
        } catch (error) {
            toastError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, createNewItem };
}

export default useNewItem;
