import { onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { TRANSACTIONS_COLLECTION_REF } from '../constants/firebase/collections';
import useUser from './useUser';
import { toastError } from '@/lib/utils';
import { TransactionType } from '../schemas/transaction';

function useTransactions() {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const [transactions, setTransactions] = useState<TransactionType[]>([]);

    useEffect(() => {
        if (!user) {
            return;
        }

        const transactionsQuery = query(
            TRANSACTIONS_COLLECTION_REF,
            where('business_id', '==', user.uid)
        );

        const unsub = onSnapshot(transactionsQuery, (snapshot) => {
            try {
                const transactionsResult: TransactionType[] = [];
                for (const transactionDoc of snapshot.docs) {
                    const transactionData =
                        transactionDoc.data() as TransactionType;
                    transactionsResult.push(transactionData);
                }

                setIsEmpty(snapshot.empty);
                setTransactions(transactionsResult);
            } catch (error) {
                toastError(error);
            } finally {
                setIsLoading(false);
            }
        });

        return () => unsub();
    }, [user?.uid]);

    return { isLoading, isEmpty, transactions };
}

export default useTransactions;
