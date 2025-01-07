import auth from '@/app/firebase/auth';
import { LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function Sidebar() {
    return (
        <div className="flex h-screen w-fit flex-col justify-between bg-[#1C2434] px-4 py-6">
            <div>
                <Image
                    alt="Punto"
                    src="./logo.svg"
                    width={35.14}
                    height={57.21}
                />
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
