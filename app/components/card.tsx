// ProductList.tsx
import React, { useContext, useState } from 'react';
import { product_type } from '@utils/types';

const Card: React.FC<{ product: product_type }> = ({product} ) => {
    const [flag,setflag] = useState<boolean>(false);

    const ontoggle = ()=>{
        setflag((pre)=>!pre)
    }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
        <img src={product.img} alt={product.name} className="w-full h-48 object-cover mb-4" />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">Stars: {product.stars}</p>
        <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View Product
        </a>
        <div className="mt-4 flex justify-between items-center">
            <span className="text-purple-500 font-semibold">{product.price}</span>
            <img src="https://img.icons8.com/?size=100&id=rMdkAyHngv7o&format=png&color=000000" alt="Wishlist Icon" className="w-6 h-6" />
        </div>
        <button type='button' onClick={ontoggle} className='inline-flex text-white bg-blue-700 border-0 py-2 px-6 focus:outline-none hover:bg-blue-800 rounded text-lg'>Set Target</button>
        { flag && <div className="flex-col text-center backdrop-blur-md absolute p-10 inset-0">
            <input type="number" id="search" className="block p-2.5 w-full z-20 mb-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Creat Aleart" required />
            <button type="button" onClick={ontoggle} className='text-white bg-blue-700 border-0 py-2 px-6 focus:outline-none hover:bg-blue-800 rounded text-lg'>Creat Aleart</button>
        </div>}
    </div>
  );
};

export default Card;
