import { TransactionType } from '@/app/schemas/transaction';
import { fieldSorter } from '@/lib/utils';
import { format } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface PropsInterface {
    transactions: TransactionType[];
}

function PurchasesTable(props: PropsInterface) {
    const { transactions } = props;

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

    const sortedTransactions = useMemo(
        () =>
            transactions
                .sort(fieldSorter(sortField))
                .filter(
                    (transaction) =>
                        regex.test(transaction.customer.full_name) ||
                        regex.test(
                            format(
                                transaction.timestamp.toDate(),
                                'MMMM dd, yyyy'
                            )
                        ) ||
                        regex.test(transaction.total_price.toString()) ||
                        regex.test(transaction.points.toString())
                ),
        [transactions, sortField, regex]
    );

    return (
        <div className="border-[1px] border-[#E2E8F0] bg-white px-9 py-7">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#212B36]">
                    Customer Purchases
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
                    <p>Purchase Date</p>
                    {sortField === 'timestamp' && <ChevronUpIcon size={14} />}
                    {sortField === '-timestamp' && (
                        <ChevronDownIcon size={14} />
                    )}
                </button>
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle('total_price')}
                >
                    <p>Price</p>
                    {sortField === 'total_price' && <ChevronUpIcon size={14} />}
                    {sortField === '-total_price' && (
                        <ChevronDownIcon size={14} />
                    )}
                </button>
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle('points')}
                >
                    <p>Points Earned</p>
                    {sortField === 'points' && <ChevronUpIcon size={14} />}
                    {sortField === '-points' && <ChevronDownIcon size={14} />}
                </button>
            </header>

            {sortedTransactions.map(
                ({
                    transaction_id,
                    receipt_photo_url,
                    customer,
                    timestamp,
                    total_price,
                    points,
                }) => (
                    <div
                        key={transaction_id}
                        className="grid grid-cols-4 border-t-[1px] border-[#E2E8F0] py-5 text-sm text-[#1C2434]"
                    >
                        <p>{customer.full_name}</p>
                        <p>{format(timestamp.toDate(), 'MMM dd, yyyy')}</p>
                        <a
                            className="text-[#10B981] underline"
                            href={receipt_photo_url}
                            target="_blank"
                        >
                            ₱{total_price}
                        </a>
                        <p>{points}</p>
                    </div>
                )
            )}
        </div>
    );
}

export default PurchasesTable;
