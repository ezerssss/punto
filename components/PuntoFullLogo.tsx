import { sora } from '@/app/fonts';
import Image from 'next/image';
import React, { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface PropsInterface {
    size?: 'regular' | 'small' | 'large';
    className?: HTMLProps<HTMLElement>['className'];
}

function PuntoFullLogo(props: PropsInterface) {
    if (props?.size === 'small') {
        return (
            <div
                className={twMerge(
                    'flex w-fit items-center gap-1',
                    props.className
                )}
            >
                <Image width={27} height={49} alt="Punto" src="/logo.svg" />
                <h2 className={`${sora.className} text-lg font-semibold`}>
                    punto
                </h2>
            </div>
        );
    }

    if (props?.size === 'large') {
        return (
            <div
                className={twMerge(
                    'flex w-fit items-center gap-1',
                    props.className
                )}
            >
                <Image width={56.5} height={91} alt="Punto" src="/logo.svg" />
                <h2 className={`${sora.className} text-[54px] font-semibold`}>
                    punto
                </h2>
            </div>
        );
    }

    return (
        <div
            className={twMerge(
                'flex w-fit items-center gap-2',
                props.className
            )}
        >
            <Image width={37} height={59} alt="Punto" src="/logo.svg" />
            <h2 className={`${sora.className} text-3xl font-semibold`}>
                punto
            </h2>
        </div>
    );
}

export default PuntoFullLogo;
