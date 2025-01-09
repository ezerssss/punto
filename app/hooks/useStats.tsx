import { useEffect, useState } from 'react';
import { TransactionType } from '../schemas/transaction';
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    where,
} from 'firebase/firestore';
import {
    BUSINESSES_COLLECTION_REF,
    PAYOUTS_COLLECTION_REF,
    TRANSACTIONS_COLLECTION_REF,
} from '../constants/firebase/collections';
import useUser from './useUser';
import { FIREBASE_COLLECTION_ENUMS } from '../enums/firebase';
import { BusinessCustomerDataType } from '../schemas/user/business';
import { PayoutType } from '../schemas/payout';

function useStats(startDate?: Date, endDate?: Date) {
    const { user } = useUser();
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [newBusinessCustomers, setNewBusinessCustomers] = useState<
        BusinessCustomerDataType[]
    >([]);
    const [payouts, setPayouts] = useState<PayoutType[]>([]);

    // Transactions
    useEffect(() => {
        if (!startDate || !endDate || !user) {
            return;
        }

        const startTimestamp = Timestamp.fromDate(startDate);
        const endTimestamp = Timestamp.fromDate(endDate);

        const transactionsQuery = query(
            TRANSACTIONS_COLLECTION_REF,
            where('business_id', '==', user.uid),
            where('timestamp', '>=', startTimestamp),
            where('timestamp', '<=', endTimestamp),
            orderBy('timestamp', 'desc')
        );

        const unsub = onSnapshot(transactionsQuery, (snapshot) => {
            const transactionsLocal: TransactionType[] = [];
            for (const doc of snapshot.docs) {
                const transactionData = doc.data() as TransactionType;
                transactionsLocal.push(transactionData);
            }
            setTransactions(transactionsLocal);
        });

        return () => unsub();
    }, [startDate, endDate, user]);

    // Customers
    useEffect(() => {
        if (!startDate || !endDate || !user) {
            return;
        }

        const startTimestamp = Timestamp.fromDate(startDate);
        const endTimestamp = Timestamp.fromDate(endDate);

        const businessDocRef = doc(BUSINESSES_COLLECTION_REF, user.uid);
        const businessCustomersCollectionRef = collection(
            businessDocRef,
            FIREBASE_COLLECTION_ENUMS.CUSTOMERS_COLLECTION
        );
        const customersQuery = query(
            businessCustomersCollectionRef,
            where('business_id', '==', user.uid),
            where('date_joined', '>=', startTimestamp),
            where('date_joined', '<=', endTimestamp),
            orderBy('date_joined', 'desc')
        );

        const unsub = onSnapshot(customersQuery, (snapshot) => {
            const businessCustomersLocal: BusinessCustomerDataType[] = [];
            for (const doc of snapshot.docs) {
                const businessCustomerData =
                    doc.data() as BusinessCustomerDataType;
                businessCustomersLocal.push(businessCustomerData);
            }
            setNewBusinessCustomers(businessCustomersLocal);
        });

        return () => unsub();
    }, [startDate, endDate, user]);

    // Payouts
    useEffect(() => {
        if (!startDate || !endDate || !user) {
            return;
        }

        const startTimestamp = Timestamp.fromDate(startDate);
        const endTimestamp = Timestamp.fromDate(endDate);

        const payoutQuery = query(
            PAYOUTS_COLLECTION_REF,
            where('business_id', '==', user.uid),
            where('timestamp', '>=', startTimestamp),
            where('timestamp', '<=', endTimestamp),
            orderBy('timestamp', 'desc')
        );

        const unsub = onSnapshot(payoutQuery, (snapshot) => {
            const payoutsLocal: PayoutType[] = [];
            for (const doc of snapshot.docs) {
                const payoutData = doc.data() as PayoutType;
                payoutsLocal.push(payoutData);
            }
            setPayouts(payoutsLocal);
        });

        return () => unsub();
    }, [startDate, endDate, user]);

    return { transactions, newBusinessCustomers, payouts };
}

export default useStats;
