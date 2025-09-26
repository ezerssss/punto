'use client';

import Image from 'next/image';
import React from 'react';
import ItemAction from './ItemAction';
import useGetShopItems from '../hooks/useGetShopItems';
import { Loader2Icon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

function ItemsTable() {
    const { isLoading, isEmpty, shopItems } = useGetShopItems();

    return (
        <div>
            <header className="grid grid-cols-[1fr_200px_200px_50px] grid-rows-1 rounded-t-lg border-[1px] border-b-0 border-[#E2E8F0] bg-gray-100/50 px-3 py-2 text-[#64748B]">
                <p>Item</p>
                <p>Price</p>
                <p>Status</p>
            </header>

            <div className="grid grid-cols-[1fr_200px_200px_50px] grid-rows-1 items-center gap-y-6 rounded-b-lg border-[1px] border-[#E2E8F0] bg-white px-3 py-2">
                {isLoading && (
                    <div className="col-span-4 my-8 flex justify-center">
                        <Loader2Icon className="animate-spin" />
                    </div>
                )}

                {isEmpty && (
                    <div className="col-span-4 my-8 flex justify-center">
                        <p>No Items.</p>
                    </div>
                )}

                {shopItems.map((item) => (
                    <React.Fragment key={item.item_id}>
                        <div className="flex items-center gap-2">
                            <Image
                                src={item.image_url}
                                alt="item"
                                width={40}
                                height={40}
                                className="aspect-square rounded-full border-[1px] object-cover"
                            />
                            <p>{item.item_name}</p>
                        </div>
                        <p>{item.price}pts</p>
                        <p
                            className={twMerge(
                                item.status === 'Active'
                                    ? 'text-green-600'
                                    : 'text-red-500'
                            )}
                        >
                            {item.status}
                        </p>
                        <ItemAction item={item} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default ItemsTable;
