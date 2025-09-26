import { toastError } from '@/lib/utils';
import {
    StorageError,
    StorageErrorCode,
    StorageReference,
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../firebase/storage';

function useUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    async function deleteFromURL(url: string) {
        try {
            const imageRef = ref(storage, url);

            await deleteObject(imageRef);
        } catch (error) {
            if (error instanceof StorageError) {
                setError(error.message);

                if (error.code === StorageErrorCode.OBJECT_NOT_FOUND) {
                    return;
                }
            }

            toastError(error);
        }
    }

    async function uploadPicture(
        storageRef: StorageReference,
        image: File | ArrayBuffer
    ): Promise<string> {
        setIsUploading(true);

        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            // While uploading
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setProgress(progress);

                switch (snapshot.state) {
                    case 'running':
                        setIsUploading(true);
                        break;
                    case 'success':
                    case 'paused':
                    case 'error':
                    case 'canceled':
                        setIsUploading(false);
                        break;
                }
            },
            // When error
            (error) => {
                setError(error.message);
                toastError(error.message);
            },
            // When success
            () => {
                setIsUploading(false);
            }
        );

        await uploadTask;
        const photoUrl = await getDownloadURL(uploadTask.snapshot.ref);

        setIsUploading(false);

        return photoUrl;
    }

    return {
        uploadPicture,
        deleteFromURL,
        isUploading,
        progress,
        error,
    };
}

export default useUpload;
