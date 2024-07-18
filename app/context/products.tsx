'use client'
import React, { createContext, useState, ReactNode } from 'react';
import { product_type } from '@utils/types'; 

type ContextType = {
  products: product_type[];
  setProducts: React.Dispatch<React.SetStateAction<product_type[]>>;
};

const defaultValue: ContextType = {
  products: [],
  setProducts: () => {},
};

export const AppContext = createContext<ContextType>(defaultValue);


export const AppProvider = ({ children }: {children: ReactNode;}) => {
  const [products, setProducts] = useState<product_type[]>([]);

  return (
    <AppContext.Provider value={{ products, setProducts }}>
      {children}
    </AppContext.Provider>
  );
};
