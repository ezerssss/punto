'use client';

import React, { useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ShopItemFormSchema, ShopItemFormType } from '../schemas/forms/shop';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePondFile } from 'filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import { toastError } from '@/lib/utils';
import { EditIcon, Loader2Icon } from 'lucide-react';
import { EditShopItemRequestType, ShopItemType } from '../schemas/shop';
import useUser from '../hooks/useUser';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import useUpload from '../hooks/useUpload';
import { ref } from 'firebase/storage';
import { storage } from '../firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { EDIT_SHOP_ITEM_URL } from '../constants/url';
import { toast } from 'sonner';

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginImageCrop
);

interface PropsInterface {
    item: ShopItemType;
}

function EditItem(props: PropsInterface) {
    const { item } = props;

    const { user } = useUser();
    const { uploadPicture } = useUpload();
    const pond = useRef<FilePond>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [originalImageId, setOriginalImageId] = useState('');
    const [imageFile, setImageFile] = useState<FilePondFile[]>([]);
    const form = useForm<ShopItemFormType>({
        resolver: zodResolver(ShopItemFormSchema),
        defaultValues: {
            item_name: item.item_name,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            status: item.status,
        },
    });

    async function getImage() {
        if (!pond.current) {
            return;
        }

        const imageRes = await fetch(item.image_url, {});
        const blob = await imageRes.blob();
        const file = new File([blob], 'image', { type: 'image/jpeg' });
        const original = await pond.current.addFile(file);
        setOriginalImageId(original.id);
    }

    async function onSubmit(values: ShopItemFormType) {
        if (imageFile.length < 1) {
            toastError('Select an image for the item.');
            return;
        }

        if (!user) {
            return;
        }

        try {
            const log = await analytics;

            if (log) {
                logEvent(log, 'business-portal:edit-item');
            }

            setIsLoading(true);

            let imageUrl = item.image_url;
            if (imageFile[0].id !== originalImageId) {
                const pictureUid = uuidv4();
                const itemPictureRef = ref(
                    storage,
                    `items/${user.uid}/${pictureUid}.jpeg`
                );
                const file = await imageFile[0].file.arrayBuffer();
                imageUrl = await uploadPicture(itemPictureRef, file);
            }

            const editedItem: EditShopItemRequestType = {
                ...values,
                image_url: imageUrl,
                item_id: item.item_id,
            };

            const idToken = await user.getIdToken(true);

            const res = await fetch(EDIT_SHOP_ITEM_URL, {
                method: 'POST',
                body: JSON.stringify(editedItem),
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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-1 text-sm"
                >
                    <EditIcon size={15} />
                    <p>Edit</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[95%] w-[500px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogDescription>
                        Edit an item in your shop!
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-3 space-y-3"
                    >
                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="item_name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>
                                            Item Name
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Item"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>
                                            Status
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                onValueChange={(value) => {
                                                    // Crazy dumb fix
                                                    const newVal = value as
                                                        | 'Active'
                                                        | 'Inactive';
                                                    form.setValue(
                                                        'status',
                                                        newVal
                                                    );
                                                }}
                                            >
                                                <SelectTrigger className="flex-1">
                                                    <SelectValue
                                                        placeholder="Active"
                                                        defaultValue="Active"
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem
                                                            defaultChecked
                                                            value="Active"
                                                        >
                                                            Active
                                                        </SelectItem>
                                                        <SelectItem value="Inactive">
                                                            Inactive
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>
                                            Price (In Points)
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>
                                            Stock Quantity
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormLabel>
                                Item Image
                                <span className="text-red-400">*</span>
                            </FormLabel>
                            <FilePond
                                required
                                allowImageResize
                                allowImageTransform
                                ref={pond}
                                oninit={getImage}
                                imageTransformOutputQuality={80}
                                imageCropAspectRatio="400:200"
                                allowFileTypeValidation
                                acceptedFileTypes={['image/*']}
                                imageResizeTargetHeight={200}
                                imageResizeTargetWidth={400}
                                imagePreviewHeight={200}
                                onupdatefiles={setImageFile}
                                allowMultiple={false}
                                maxFiles={1}
                                name="files" /* sets the file input name, it's filepond by default */
                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>
                                        Description{' '}
                                        <span className="text-gray-400">
                                            (
                                            {
                                                form.getValues().description
                                                    .length
                                            }{' '}
                                            / 250)
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Description"
                                            maxLength={250}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2Icon className="animate-spin" />
                            ) : (
                                'Edit'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EditItem;
