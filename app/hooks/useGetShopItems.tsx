'use client';

import { useEffect, useState } from 'react';
import useUser from './useUser';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { SHOP_ITEMS_COLLECTION_REF } from '../constants/firebase/collections';
import { ShopItemType } from '../schemas/shop';

function useGetShopItems() {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();
    const [shopItems, setShopItems] = useState<ShopItemType[]>([]);
    const isEmpty = shopItems.length < 1 && !isLoading;

    useEffect(() => {
        if (!user) {
            return;
        }

        const itemsQuery = query(
            SHOP_ITEMS_COLLECTION_REF,
            where('business_id', '==', user.uid),
            orderBy('date_created', 'desc')
        );

        const unsub = onSnapshot(itemsQuery, (snapshot) => {
            const itemsLocal: ShopItemType[] = [];

            for (const doc of snapshot.docs) {
                const data = doc.data() as ShopItemType;
                itemsLocal.push(data);
            }

            setIsLoading(false);
            setShopItems(itemsLocal);
        });

        return () => unsub();
    }, [user]);

    return { isLoading, isEmpty, shopItems };
}

export default useGetShopItems;
