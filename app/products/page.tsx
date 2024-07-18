// pages/index.tsx
"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { AppProvider } from '@app/context/products';

// Dynamically import product components
const CromaProducts = dynamic(() => import('../components/croma'), { ssr: false });
const FlipkartProducts = dynamic(() => import('../components/flipcart'), { ssr: false });
const AmazonProducts = dynamic(() => import('../components/amazon'), { ssr: false });
const ProductList = dynamic(() => import('../components/Productlist'), { ssr: false });

const Home: React.FC = () => {
  const search = 'laptops'; // Example search query

  return (
    <AppProvider>
      <div className="container mx-auto p-2">
        <ProductList search={search}/>
        <Suspense fallback={<div>Loading Croma products...</div>}>
          <CromaProducts search={search} />
        </Suspense>
        <Suspense fallback={<div>Loading Flipkart products...</div>}>
          <FlipkartProducts search={search} />
        </Suspense>
        <Suspense fallback={<div>Loading Amazon products...</div>}>
          <AmazonProducts search={search} />
        </Suspense>
      </div>
    </AppProvider>
  );
};

export default Home;
