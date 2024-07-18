'use client'
import Card from "@app/components/card";
import sendMail from "@app/helper/mailsend";
import { product_type } from "@utils/types";
import { useEffect, useState } from "react";

export default function Home() {
    const [wish,setwish] = useState<product_type[] |void>([]);
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/product/wish`);
            if (!response.ok) {
            throw new Error('Failed to fetch products');
            }
            const data: product_type[] = await response.json();
            setwish(data);
        } catch (error) {
            console.log(error);
        }
    }
   
    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {wish?.map((product: product_type, index: number) => (
            <Card product={product}/>
        ))}
    </div>  
    );
}
