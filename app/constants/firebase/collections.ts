import db from '@/app/firebase/db';
import { collection } from 'firebase/firestore';
import { FIREBASE_COLLECTION_ENUMS } from '../../enums/firebase';

export const BUSINESSES_COLLECTION_REF = collection(
    db,
    FIREBASE_COLLECTION_ENUMS.BUSINESS_COLLECTION
);

export const EMPLOYEES_COLLECTION_REF = collection(
    db,
    FIREBASE_COLLECTION_ENUMS.EMPLOYEES_COLLECTION
);

export const CUSTOMERS_COLLECTION_REF = collection(
    db,
    FIREBASE_COLLECTION_ENUMS.CUSTOMERS_COLLECTION
);

export const TRANSACTIONS_COLLECTION_REF = collection(
    db,
    FIREBASE_COLLECTION_ENUMS.TRANSACTIONS_COLLECTION
);

export const POINTS_COLLECTION_REF = collection(
    db,
    FIREBASE_COLLECTION_ENUMS.POINTS_COLLECTION
);

export const PAYOUTS_COLLECTION_REF = collection(
    db,
    FIREBASE_COLLECTION_ENUMS.PAYOUTS_COLLECTION
);

export const SHOP_ITEMS_COLLECTION_REF = collection(
    db,
    FIREBASE_COLLECTION_ENUMS.SHOP_ITEMS_COLLECTION
);
