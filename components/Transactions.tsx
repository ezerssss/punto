'use client';

import useTransactions from '@/app/hooks/useTransactions';
import React from 'react';
import { PuffLoader } from 'react-spinners';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import Link from 'next/link';
import { LinkIcon } from 'lucide-react';

function Transactions() {
    const { isLoading, isEmpty, transactions } = useTransactions();

    return (
        <div>
            <h2 className="text-2xl">Transactions</h2>
            <div className="mt-5">
                {isLoading && (
                    <div className="flex flex-col items-center">
                        <PuffLoader />
                        <p className="mt-2 text-sm text-gray-400">
                            Loading transactions
                        </p>
                    </div>
                )}
                {!isLoading && isEmpty && <p>No transactions</p>}
                {transactions.map((transaction) => {
                    const {
                        transaction_id,
                        customer,
                        employee,
                        timestamp,
                        points,
                        receipt_photo_url,
                    } = transaction;
                    const date = new Date(timestamp);
                    return (
                        <Card key={transaction_id}>
                            <CardHeader>
                                <CardTitle>
                                    {customer.full_name}
                                    {' | '}
                                    {points} points
                                </CardTitle>
                                <CardDescription>
                                    <p>
                                        {date.toLocaleDateString()}
                                        {' - '}
                                        {date.toLocaleTimeString()}
                                    </p>
                                    <p>Scanned by {employee.username}</p>
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Link
                                    href={receipt_photo_url}
                                    className="flex gap-2"
                                    target="_blank"
                                >
                                    <LinkIcon /> Receipt image
                                </Link>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default Transactions;
