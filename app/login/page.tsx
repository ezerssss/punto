import { Suspense } from 'react';
import LoginForm from './LoginForm';
import PuntoFullLogo from '@/components/PuntoFullLogo';

function LoginPage() {
    return (
        <Suspense>
            <main className="flex h-screen w-screen items-center justify-center bg-[#1C2434]">
                <div className="flex h-3/4 w-[90%] sm:w-3/4">
                    <div className="hidden flex-1 flex-col items-center justify-center gap-3 bg-white bg-[url('/images/component/login-blobs.svg')] bg-cover bg-no-repeat min-[1000px]:flex">
                        <PuntoFullLogo />
                        <p className="text-sm text-[#64748B] xl:text-base">
                            Start tracking your customer rewards journey.
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </main>
        </Suspense>
    );
}

export default LoginPage;
