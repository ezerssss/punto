import { PayoutType } from '@/app/schemas/payout';
import { fieldSorter } from '@/lib/utils';
import { format } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface PropsInterface {
    payouts: PayoutType[];
}

function PayoutsTable(props: PropsInterface) {
    const { payouts } = props;

    const [sortField, setSortField] = useState<string>('-timestamp');

    function handleToggle(field: string) {
        if (sortField === field) {
            setSortField(`-${field}`);
        } else {
            setSortField(field);
        }
    }

    const divRef = useRef<HTMLDivElement>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [queryString, setQueryString] = useState('');

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!divRef.current) {
                return;
            }

            if (!divRef.current.contains(event.target as HTMLElement)) {
                setIsSearching(false);
            }
        }

        addEventListener('click', handleClickOutside);
        return () => removeEventListener('click', handleClickOutside);
    }, [divRef]);

    const escapedQuery = queryString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = `.*${escapedQuery.split('').join('.*')}.*`;
    const regex = useMemo(() => new RegExp(pattern, 'i'), [pattern]);

    const sortedPayouts = useMemo(
        () =>
            payouts
                .sort(fieldSorter(sortField))
                .filter(
                    (payout) =>
                        regex.test(payout.customer.full_name) ||
                        regex.test(payout.points_to_redeem.toString()) ||
                        regex.test(
                            format(payout.timestamp.toDate(), 'MMMM dd, yyyy')
                        )
                ),
        [payouts, sortField, regex]
    );

    return (
        <div className="border-[1px] border-[#E2E8F0] bg-white px-9 py-7">
            <div className="flex items-start justify-between">
                <h2 className="mb-5 text-xl font-bold text-[#212B36]">
                    Points Redemption
                </h2>

                <div className="relative flex items-center" ref={divRef}>
                    <input
                        className={twMerge(
                            'border-b-2 px-2 text-gray-600 outline-none transition-all',
                            isSearching ? 'w-60' : 'w-0 border-b-0'
                        )}
                        placeholder="Search"
                        onChange={(e) => setQueryString(e.target.value)}
                    />
                    <button
                        className="absolute right-2 text-gray-400"
                        onClick={() => setIsSearching(true)}
                    >
                        <SearchIcon size={15} />
                    </button>
                </div>
            </div>

            <header className="grid grid-cols-4 border-t-[1px] border-[#E2E8F0] py-5 text-sm text-[#64748B]">
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle('customer.full_name')}
                >
                    <p>Customer</p>
                    {sortField === 'customer.full_name' && (
                        <ChevronUpIcon size={14} />
                    )}
                    {sortField === '-customer.full_name' && (
                        <ChevronDownIcon size={14} />
                    )}
                </button>
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle('timestamp')}
                >
                    <p>Redemption Date</p>
                    {sortField === 'timestamp' && <ChevronUpIcon size={14} />}
                    {sortField === '-timestamp' && (
                        <ChevronDownIcon size={14} />
                    )}
                </button>
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle('points_to_redeem')}
                >
                    <p>Points Redeemed</p>
                    {sortField === 'points_to_redeem' && (
                        <ChevronUpIcon size={14} />
                    )}
                    {sortField === '-points_to_redeem' && (
                        <ChevronDownIcon size={14} />
                    )}
                </button>
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle('points_to_redeem')}
                >
                    <p>Redemption Value</p>
                    {sortField === 'points_to_redeem' && (
                        <ChevronUpIcon size={14} />
                    )}
                    {sortField === '-points_to_redeem' && (
                        <ChevronDownIcon size={14} />
                    )}
                </button>
            </header>

            {sortedPayouts.map(
                ({ payout_id, customer, timestamp, points_to_redeem }) => (
                    <div
                        key={payout_id}
                        className="grid grid-cols-4 border-t-[1px] border-[#E2E8F0] py-5 text-sm text-[#1C2434]"
                    >
                        <p>{customer.full_name}</p>
                        <p>{format(timestamp.toDate(), 'MMM dd, yyyy')}</p>
                        <p>{points_to_redeem}</p>
                        <p className="text-[#F0950C]">₱{points_to_redeem}</p>
                    </div>
                )
            )}
        </div>
    );
}

export default PayoutsTable;
