import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Sora, Nunito } from 'next/font/google';

const sora = Sora({ subsets: ['latin'] });
const nunito = Nunito({ subsets: ['latin'] });

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
            <body className={`${sora.className} ${nunito.className}`}>
                {children}
                <Toaster richColors />
            </body>
        </html>
    );
}
