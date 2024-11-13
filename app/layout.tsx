import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
    title: 'Punto',
    description: 'Business Portal',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Header />

                <div className='className="px-5 xl:px-20" py-10 md:px-10 lg:px-16'>
                    {children}
                </div>

                <Toaster richColors />
            </body>
        </html>
    );
}
