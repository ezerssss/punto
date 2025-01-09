import { PayoutType } from '@/app/schemas/payout';
import { format } from 'date-fns';
import React from 'react';

interface PropsInterface {
    payouts: PayoutType[];
}

function PayoutsTable(props: PropsInterface) {
    const { payouts } = props;

    return (
        <div className="border-[1px] border-[#E2E8F0] bg-white px-9 py-7">
            <h2 className="mb-5 text-xl font-bold text-[#212B36]">
                Points Redemption
            </h2>

            <header className="grid grid-cols-4 border-t-[1px] border-[#E2E8F0] py-5 text-sm text-[#64748B]">
                <p>Customer</p>
                <p>Redemption Date</p>
                <p>Points Redeemed</p>
                <p>Redemption Value</p>
            </header>

            {payouts.map(
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
