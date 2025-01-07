'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import auth from '@/app/firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

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
    }, [delay, pathname, router]);

    const authCheck = isAuthenticated ? (
        <div className="flex w-full">
            <Sidebar />
            <aside className="flex-1">
                <Topbar />

                <div className="p-10">{children}</div>
            </aside>
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
