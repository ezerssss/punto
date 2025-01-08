'use client';

import useUser from '@/app/hooks/useUser';
import Image from 'next/image';
import React from 'react';

function Topbar() {
    const { business } = useUser();

    return (
        <div className="flex h-14 items-center justify-end gap-2 bg-white px-8 py-3">
            {business && (
                <>
                    <p className="text-[#212B36]">{business.business_name}</p>
                    <Image
                        unoptimized
                        alt="business"
                        src={business?.photo_url ?? ''}
                        width={40}
                        height={40}
                        objectFit="cover"
                        className="aspect-square rounded-full border-[1px] object-cover"
                    />
                </>
            )}
        </div>
    );
}

export default Topbar;
