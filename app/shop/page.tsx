import ProtectedRouteWrapper from '@/components/ProtectedRouteWrapper';
import React from 'react';

import ItemsTable from './ItemsTable';
import CreateItem from './CreateItem';

function ShopPage() {
    return (
        <ProtectedRouteWrapper>
            <main className="space-y-7">
                <header className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-[#212B36]">
                        Store Items
                    </h1>

                    <CreateItem />
                </header>

                <ItemsTable />
            </main>
        </ProtectedRouteWrapper>
    );
}

export default ShopPage;
