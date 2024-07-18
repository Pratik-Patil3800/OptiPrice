// ProductList.tsx
import React, { useContext, useState } from 'react';
import { product_type } from '@utils/types';

const ProductCard: React.FC<{ product: product_type }> = ({product} ) => {
    const [flag,setflag] = useState<boolean>(true);

    const fun = async()=>{
        if(flag){
            try {
                const response = await fetch(`http://localhost:3000/api/product/add-wishlist`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product), 
                });
                if (!response.ok) {
                  throw new Error('Failed to fetch products');
                }
              } catch (error) {
                console.log(error);
              }
            setflag(false);
        }
    }

  return (
    <div className="flex flex-col flex-1 justify-between bg-white rounded-lg shadow-md p-4">
        <img src={product.img} alt={product.name} className="w-full h-48 object-cover mb-4" />
        <div className='flex flex-col flex-1 justify-between'>
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <div>
            <p className="text-gray-600 mb-2 font-semibold">Stars: {product.stars}</p>
            <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mb-2">
                View Product
            </a>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-customYellow font-semibold">{product.price}</span>
                <img src="https://img.icons8.com/?size=100&id=rMdkAyHngv7o&format=png&color=000000" alt="Wishlist Icon" className={`w-10 h-10 ${flag ? 'bg-customYellow' : 'bg-customRed'}  rounded-md`} onClick={fun}/>
            </div>              
            </div>
        </div>
    </div>
  );
};

export default ProductCard;
