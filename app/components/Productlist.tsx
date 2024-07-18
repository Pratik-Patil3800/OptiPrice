// ProductList.tsx
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '@app/context/products';
import { product_type } from '@utils/types';
import ProductCard from './productcard';

const ProductList: React.FC<{ search: string }> = ({ search }) => {
  const context = useContext(AppContext);
 

  const { products,setProducts } = context;
  const [sortedProducts, setSortedProducts] = useState<product_type[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');

  useEffect(() => {
    let sortedList = [...products];
    if (sortOption === 'priceAsc') {
      sortedList.sort((a, b) => (a.price) - (b.price));
    } else if (sortOption === 'priceDesc') {
      sortedList.sort((a, b) => (b.price) - (a.price));
    }
    else if(sortOption==='rating'){
      sortedList.sort((a, b) => (b.stars) - (a.stars));
    }
    setSortedProducts(sortedList);
  }, [products, sortOption]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4">Product Search : {search}</h1>
        <select 
          id="dropdown-button" 
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-gray-100 focus:border-blue-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" 
          onChange={handleSortChange}
          value={sortOption}
        >
          <option value="default" className='hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Default</option>
          <option value="priceAsc" className='hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Price: Low to High</option>
          <option value="priceDesc" className='hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Price: High to Low</option>
          <option value="rating" className='hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Reviews</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {sortedProducts?.map((product: product_type, index: number) => (
          <ProductCard product={product}/>
        ))}
      </div>
    </>
  );
};

export default ProductList;
