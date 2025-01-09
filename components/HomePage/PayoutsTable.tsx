import { PayoutType } from '@/app/schemas/payout';
import { fieldSorter } from '@/lib/utils';
import { format } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';

interface PropsInterface {
    payouts: PayoutType[];
}

function PayoutsTable(props: PropsInterface) {
    const { payouts } = props;

    const [sorts, setSorts] = useState<string[]>([
        '-timestamp',
        'points_redeemed',
        'points_redeemed',
        'customer.full_name',
    ]);

    const sortedPayouts = useMemo(
        () => payouts.sort(fieldSorter(sorts)),
        [payouts, sorts]
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
                Points Redemption
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
                    <p>Redemption Date</p>
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
                    <p>Points Redeemed</p>
                    {sorts[1] === 'points_redeemed' ? (
                        <ChevronUpIcon size={14} />
                    ) : (
                        <ChevronDownIcon size={14} />
                    )}
                </button>
                <button
                    className="flex items-center justify-start gap-1"
                    onClick={() => handleToggle(2)}
                >
                    <p>Redemption Value</p>
                    {sorts[2] === 'points_redeemed' ? (
                        <ChevronUpIcon size={14} />
                    ) : (
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
