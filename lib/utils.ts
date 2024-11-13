import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'firebase/auth';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toastError(error: unknown) {
    console.error(error);

    let message = 'Something went wrong.';

    if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.INTERNAL_ERROR) {
            message = error.message;
        } else if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
            message = 'Invalid username or password';
        } else {
            message = error.message;
        }
    } else if (error instanceof Error) {
        message = error.message;
    } else if (typeof error === 'string') {
        message = error;
    }

    toast.error(message);
}
