import ProtectedRouteWrapper from '@/components/ProtectedRouteWrapper';
import React from 'react';

function Home() {
    return <ProtectedRouteWrapper>Home</ProtectedRouteWrapper>;
}

export default Home;
