import React from 'react';
import StatBox from './StatBox';
import { TransactionType } from '@/app/schemas/transaction';
import {
    getNumberOfCustomersFromPayouts,
    getNumberOfCustomersFromTransactions,
    numberWithCommas,
} from '@/lib/utils';
import { BusinessCustomerDataType } from '@/app/schemas/user/business';
import { PayoutType } from '@/app/schemas/payout';

interface PropsInterface {
    transactions: TransactionType[];
    newBusinessCustomers: BusinessCustomerDataType[];
    payouts: PayoutType[];
}

function SummaryStats(props: PropsInterface) {
    const { transactions, newBusinessCustomers, payouts } = props;

    const totalCustomers = getNumberOfCustomersFromTransactions(transactions);

    const revenue = transactions.reduce(
        (accumulator, currentValue) => accumulator + currentValue.total_price,
        0
    );
    const pointsGiven = transactions.reduce(
        (accumulator, currentValue) => accumulator + currentValue.points,
        0
    );

    const rewardsCashedOut = payouts.reduce(
        (accumulator, currentValue) =>
            accumulator + currentValue.points_to_redeem,
        0
    );
    const averageRedemptionRate =
        payouts.length > 0
            ? (totalCustomers / getNumberOfCustomersFromPayouts(payouts)) * 100 // Total customers / Number of customers that redeemed
            : 0;

    return (
        <section className="grid grid-cols-2 grid-rows-3 gap-4 lg:grid-cols-3 lg:grid-rows-2 xl:grid-cols-6 xl:grid-rows-1">
            <StatBox
                title="Total Revenue"
                content={`₱${numberWithCommas(revenue)}`}
            />
            <StatBox title="Total Customers" content={totalCustomers} />
            <StatBox
                title="New Customers"
                content={newBusinessCustomers.length}
            />
            <StatBox title="Points Given" content={pointsGiven} />
            <StatBox
                title="Rewards Cashed Out"
                content={`₱${numberWithCommas(rewardsCashedOut)}`}
            />
            <StatBox
                title="Avg. Redemption Rate"
                content={`${averageRedemptionRate}%`}
            />
        </section>
    );
}

export default SummaryStats;
