'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toastError } from '@/lib/utils';
import { Loader2Icon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import { User } from 'firebase/auth';
import { DELETE_SHOP_ITEM_URL } from '../constants/url';
import { DeleteShopItemRequestType, ShopItemType } from '../schemas/shop';
import { toast } from 'sonner';
import useUpload from '../hooks/useUpload';

interface PropsInterface {
    item: ShopItemType;
    user: User | null | undefined;
}

export function DeleteItem(props: PropsInterface) {
    const { item, user } = props;
    const [isLoading, setIsLoading] = useState(false);
    const { deleteFromURL } = useUpload();
    const [isOpen, setIsOpen] = useState(false);

    async function handleDelete() {
        if (!user) {
            return;
        }

        setIsOpen(true);

        try {
            const log = await analytics;

            if (log) {
                logEvent(log, 'business-dashboard:new-item');
            }

            setIsLoading(true);

            const deleteItemRequest: DeleteShopItemRequestType = {
                item_id: item.item_id,
            };

            const idToken = await user.getIdToken(true);

            const res = await fetch(DELETE_SHOP_ITEM_URL, {
                method: 'POST',
                body: JSON.stringify(deleteItemRequest),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${idToken}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            await deleteFromURL(item.image_url);

            toast.success(data.message);
            setIsOpen(false);
        } catch (error) {
            toastError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-1 text-sm text-red-400 hover:text-red-400"
                >
                    <TrashIcon size={15} />
                    <p>Delete</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the item from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={isLoading}
                        className="bg-red-500"
                    >
                        {isLoading ? (
                            <Loader2Icon className="animate-spine" />
                        ) : (
                            'Continue'
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
