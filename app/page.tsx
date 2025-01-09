'use client';

import ProtectedRouteWrapper from '@/components/ProtectedRouteWrapper';
import React, { useState } from 'react';
import { endOfMonth, startOfMonth } from 'date-fns';
import { Range } from 'react-date-range';
import DateSelector from '@/components/HomePage/DateSelector';
import SummaryStats from '@/components/HomePage/SummaryStats';
import useStats from './hooks/useStats';
import PurchasesTable from '@/components/HomePage/PurchasesTable';
import PayoutsTable from '@/components/HomePage/PayoutsTable';

function Home() {
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
            key: 'selection',
        },
    ]);

    const { transactions, newBusinessCustomers, payouts } = useStats(
        dateRange[0].startDate,
        dateRange[0].endDate
    );

    return (
        <ProtectedRouteWrapper>
            <main className="space-y-7">
                <DateSelector
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />

                <SummaryStats
                    payouts={payouts}
                    transactions={transactions}
                    newBusinessCustomers={newBusinessCustomers}
                />

                <section className="my-10 grid grid-cols-1 grid-rows-2 gap-4 xl:grid-cols-2 xl:grid-rows-1">
                    <PurchasesTable transactions={transactions} />
                    <PayoutsTable payouts={payouts} />
                </section>
            </main>
        </ProtectedRouteWrapper>
    );
}

export default Home;
