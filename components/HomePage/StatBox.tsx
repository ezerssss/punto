import React from 'react';

interface PropsInterface {
    title: string;
    content: string | number;
}

function StatBox(props: PropsInterface) {
    const { title, content } = props;

    return (
        <div className="flex h-28 flex-col justify-center rounded-sm border-[1px] border-[#E2E8F0] bg-white px-5 drop-shadow sm:px-8 md:px-10 lg:px-8">
            <p className="text-2xl font-bold text-[#1C2434]">{content}</p>
            <p className="text-sm text-[#64748B]">{title}</p>
        </div>
    );
}

export default StatBox;
