"use client"; 
import { product_type } from "@utils/types";
import { useEffect, useState } from "react";

const CromaProducts: React.FC<{ search: string }> = ({ search }) => {
    const [products, setProducts] = useState<product_type[] |void>([]);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch(`http://localhost:3000/app/api/product/flipcart?search=${search}`);
              if (!response.ok) {
                throw new Error('Failed to fetch products');
              }
              const data: product_type[] = await response.json();
              setProducts(data);
            } catch (error) {
              console.log(error);
            }
        } 
    }, [search]);
  
  
    return (
      <div>
        {products?.map(product => (
          <div key={product.url}>
            <img src={product.img} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Stars: {product.stars}</p>
            <p>Price: {product.price}</p>
            <a href={product.url}>View on Croma</a>
          </div>
        ))}
      </div>
    );
  };
  
  export default CromaProducts;