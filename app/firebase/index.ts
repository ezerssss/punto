import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? ''
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = isSupported().then((yes) =>
    yes ? getAnalytics(app) : null
);

export default app;
