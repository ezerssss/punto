'use client';

import useUser from '@/app/hooks/useUser';
import Image from 'next/image';
import React from 'react';

function Topbar() {
    const { business } = useUser();

    return (
        <div className="flex h-14 items-center justify-end gap-1 bg-white px-8 py-3">
            {business && (
                <>
                    <p className="text-[#212B36]">{business.business_name}</p>
                    <Image
                        unoptimized
                        alt="business"
                        src={business?.photo_url ?? ''}
                        width={56}
                        height={56}
                        objectFit="cover"
                        className="aspect-square h-full rounded-full object-cover"
                    />
                </>
            )}
        </div>
    );
}

export default Topbar;
