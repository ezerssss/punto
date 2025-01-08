'use client';

import auth from '@/app/firebase/auth';
import { LayoutGridIcon, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const urls = [{ url: '/', icon: <LayoutGridIcon /> }];

function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#1C2434] px-4 py-6">
            <div>
                <Image
                    alt="Punto"
                    src="./logo.svg"
                    width={35.14}
                    height={57.21}
                    className="mb-6"
                />

                <div className="space-y-3">
                    {urls.map(({ url, icon }) => (
                        <Link
                            key={url}
                            href={url}
                            className={twMerge(
                                'block aspect-square w-full rounded-md p-2',
                                pathname === url
                                    ? 'bg-[#333A48] text-white'
                                    : 'text-white/75'
                            )}
                        >
                            {icon}
                        </Link>
                    ))}
                </div>
            </div>

            <button
                className="flex items-center justify-center gap-3 border-t-[1px] border-[#333A48] pt-3"
                onClick={() => auth.signOut()}
            >
                <LogOutIcon color="white" size={20} />
            </button>
        </div>
    );
}

export default Sidebar;
