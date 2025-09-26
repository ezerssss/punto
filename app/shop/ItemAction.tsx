'use client';

import { EllipsisIcon } from 'lucide-react';
import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ShopItemType } from '../schemas/shop';
import { DeleteItem } from './DeleteItem';
import useUser from '../hooks/useUser';
import EditItem from './EditItem';

interface PropsInterface {
    item: ShopItemType;
}

function ItemAction(props: PropsInterface) {
    const { item } = props;
    const { user } = useUser();

    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <EllipsisIcon />
                </PopoverTrigger>
                <PopoverContent className="w-fit p-0">
                    <EditItem item={item} />
                    <DeleteItem item={item} user={user} />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default ItemAction;
