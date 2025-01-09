import { TransactionType } from '@/app/schemas/transaction';
import { fieldSorter } from '@/lib/utils';
import { format } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';

interface PropsInterface {
    transactions: TransactionType[];
}

function PurchasesTable(props: PropsInterface) {
    const { transactions } = props;

    const [sorts, setSorts] = useState<string[]>([
        '-timestamp',
        'total_price',
        'points',
        'customer.full_name',
    ]);

    const sortedTransactions = useMemo(
        () => transactions.sort(fieldSorter(sorts)),
        [transactions, sorts]
    );

    function handleToggle(index: number) {
        const sortsLocal = [...sorts];
        const field = sortsLocal[index];

        if (field.startsWith('-')) {
            sortsLocal[index] = field.substring(1);
        } else {
            sortsLocal[index] = `-${field}`;
        }

        setSorts(sortsLocal);
    }

    return (
        <div className="border-[1px] border-[#E2E8F0] bg-white px-9 py-7">
            <h2 className="mb-5 text-xl font-bold text-[#212B36]">
                Customer Purchases
            </h2>

            <header className="grid grid-cols-4 border-t-[1px] border-[#E2E8F0] py-5 text-sm text-[#64748B]">
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle(3)}
                >
                    <p>Customer</p>
                    {sorts[3] === 'customer.full_name' ? (
                        <ChevronUpIcon size={14} />
                    ) : (
                        <ChevronDownIcon size={14} />
                    )}
                </button>
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle(0)}
                >
                    <p>Purchase Date</p>
                    {sorts[0] === 'timestamp' ? (
                        <ChevronUpIcon size={14} />
                    ) : (
                        <ChevronDownIcon size={14} />
                    )}
                </button>
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle(1)}
                >
                    <p>Price</p>
                    {sorts[1] === 'total_price' ? (
                        <ChevronUpIcon size={14} />
                    ) : (
                        <ChevronDownIcon size={14} />
                    )}
                </button>
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle(2)}
                >
                    <p>Points Earned</p>
                    {sorts[2] === 'points' ? (
                        <ChevronUpIcon size={14} />
                    ) : (
                        <ChevronDownIcon size={14} />
                    )}
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
