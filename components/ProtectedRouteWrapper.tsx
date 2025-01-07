'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import auth from '@/app/firebase/auth';
import { usePathname, useRouter } from 'next/navigation';

interface PropsInterface {
    children: React.ReactNode;
    delay?: boolean;
}

function ProtectedRouteWrapper(props: PropsInterface) {
    const { children, delay } = props;

    const router = useRouter();
    const pathname = usePathname();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, async (user) => {
            if (delay) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }

            if (!user) {
                setIsAuthenticated(false);
                router.push(`/login?backTo=${pathname}`);
            } else if (user) {
                const tokens = await user.getIdTokenResult();
                const isBusinessAccount = !!tokens.claims.is_business_account;

                if (!isBusinessAccount) {
                    router.push(`/login?backTo=${pathname}`);
                }

                setIsAuthenticated(isBusinessAccount);
            }

            setIsLoading(false);
        });
    }, [delay]);

    const authCheck = isAuthenticated ? (
        <div className="w-full px-5 py-10 md:px-10 lg:px-16 xl:px-20">
            {children}
        </div>
    ) : (
        <></>
    );

    return isLoading ? (
        <div className="flex h-[80svh] flex-col items-center justify-center">
            <PuffLoader />
            <p className="mt-2 text-sm text-gray-400">Authenticating</p>
        </div>
    ) : (
        authCheck
    );
}

export default ProtectedRouteWrapper;
