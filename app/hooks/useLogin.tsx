import { toastError } from '@/lib/utils';
import { logEvent } from 'firebase/analytics';
import { useState } from 'react';
import { toast } from 'sonner';
import auth from '../firebase/auth';
import { analytics } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LoginFormType } from '../schemas/forms/login';
import { useRouter, useSearchParams } from 'next/navigation';

function useLogin(callback?: () => void) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    async function logIn(credentials: LoginFormType) {
        try {
            const log = await analytics;

            if (log) {
                logEvent(log, 'business-portal:login');
            }

            setIsLoading(true);

            const { email, password } = credentials;
            await signInWithEmailAndPassword(auth, email, password);

            toast.info('Successfully logged-in.');

            if (callback) {
                callback();
            } else {
                router.push(searchParams.get('backTo') ?? '/');
            }
        } catch (error) {
            toastError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, logIn };
}

export default useLogin;
