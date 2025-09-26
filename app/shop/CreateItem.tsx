'use client';

import React, { useState } from 'react';
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
import useNewItem from '../hooks/useNewItem';
import { Loader2Icon } from 'lucide-react';

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginImageCrop
);

function CreateItem() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoading, createNewItem } = useNewItem();
    const [imageFile, setImageFile] = useState<FilePondFile[]>([]);
    const form = useForm<ShopItemFormType>({
        resolver: zodResolver(ShopItemFormSchema),
        defaultValues: {
            item_name: '',
            description: '',
            status: 'Active',
        },
    });

    async function onSubmit(values: ShopItemFormType) {
        if (imageFile.length < 1) {
            toastError('Select an image for the item.');
            return;
        }

        const file = await imageFile[0].file.arrayBuffer();
        await createNewItem(values, file);
        form.reset();
        form.setValue('price', 0);
        form.setValue('quantity', 0);
        setImageFile([]);
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create Item</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[95%] w-[500px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Create Item</DialogTitle>
                    <DialogDescription>
                        Add a new item for your customers to avail!
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
                                                step="0.01"
                                                placeholder="0.00"
                                                {...field}
                                                value={undefined}
                                                min={0}
                                                onChange={(e) =>
                                                    form.setValue(
                                                        'price',
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
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
                                                value={undefined}
                                                min={0}
                                                onChange={(e) =>
                                                    form.setValue(
                                                        'quantity',
                                                        parseInt(e.target.value)
                                                    )
                                                }
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
                                'Create'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateItem;
