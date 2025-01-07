import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import localFont from 'next/font/local';

const productSans = localFont({
    src: [
        {
            path: './fonts/Product Sans Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/Product Sans Italic.ttf',
            weight: '400',
            style: 'italic',
        },
        {
            path: './fonts/Product Sans Bold.ttf',
            weight: '700',
            style: 'bold',
        },
        {
            path: './fonts/Product Sans Bold Italic.ttf',
            weight: '700',
            style: 'italic',
        },
    ],
});

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
        <html lang="en" className={productSans.className}>
            <body className="relative flex min-h-svh flex-col bg-[#F1F5F9]">
                {children}
                <Toaster richColors />
            </body>
        </html>
    );
}
