"use client"; 
import { AppContext } from "@app/context/products";
import scrapecromaProducts from "@app/helper/croma";
import { product_type } from "@utils/types";
import { useContext, useEffect, useState } from "react";

const CromaProducts: React.FC<{ search: string }> = ({ search }) => {
  const {products, setProducts} = useContext(AppContext);

   
  useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/product/croma?search=${search}`);
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data: product_type[] = await response.json();
            setProducts((prevProducts) => [...prevProducts, ...data]);
          } catch (error) {
            console.log(error);
          }
      } 
      fetchData();
  }, [search]);
  
    
  
    return (
      <></>
    );
  };
  
  export default CromaProducts;