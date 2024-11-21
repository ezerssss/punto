import ProtectedRouteWrapper from '@/components/ProtectedRouteWrapper';
import Transactions from '@/components/Transactions';
import React from 'react';

function Home() {
    return (
        <ProtectedRouteWrapper>
            <main>
                <Transactions />
            </main>
        </ProtectedRouteWrapper>
    );
}

export default Home;
