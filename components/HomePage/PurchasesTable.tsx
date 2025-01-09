import { TransactionType } from '@/app/schemas/transaction';
import { format } from 'date-fns';
import React from 'react';

interface PropsInterface {
    transactions: TransactionType[];
}

function PurchasesTable(props: PropsInterface) {
    const { transactions } = props;

    return (
        <div className="border-[1px] border-[#E2E8F0] bg-white px-9 py-7">
            <h2 className="mb-5 text-xl font-bold text-[#212B36]">
                Customer Purchases
            </h2>

            <header className="grid grid-cols-4 border-t-[1px] border-[#E2E8F0] py-5 text-sm text-[#64748B]">
                <p>Customer</p>
                <p>Purchase Date</p>
                <p>Price</p>
                <p>Points Earned</p>
            </header>

            {transactions.map(
                ({
                    transaction_id,
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
                        <p className="text-[#10B981]">₱{total_price}</p>
                        <p>{points}</p>
                    </div>
                )
            )}
        </div>
    );
}

export default PurchasesTable;
