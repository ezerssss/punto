import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import auth from '../firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { BusinessUserDataType } from '../schemas/user/business';
import { toastError } from '@/lib/utils';
import { BUSINESSES_COLLECTION_REF } from '../constants/firebase/collections';

export default function useUser() {
    const [user, setUser] = useState<User | null>();
    const [business, setBusiness] = useState<BusinessUserDataType>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        if (!user) {
            setBusiness(undefined);
            return;
        }

        (async () => {
            try {
                const businessDocRef = doc(BUSINESSES_COLLECTION_REF, user.uid);
                const businessDoc = await getDoc(businessDocRef);
                const businessData = businessDoc.data() as BusinessUserDataType;

                setBusiness(businessData);
            } catch (error) {
                toastError(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [user]);

    return { user, business, isLoading };
}
