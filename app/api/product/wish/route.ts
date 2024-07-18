import { NextRequest, NextResponse } from 'next/server';
import { product_type } from '@utils/types';
import { getDataFromToken } from '@app/helper/getid';
import { Product, User } from '@models/User';
import { dbConnect } from '@utils/dbConnect';
dbConnect()
export async function GET(request: NextRequest) {
    console.log("at backend");
    const id=getDataFromToken(request);
    console.log(id);
  try {
    const user=await User.findById(id);
    if(user){
        const productids=user.wishlist;
        const products=await Product.find({_id:{$in:productids}});
        return NextResponse.json(products, { status: 200 });
    }
    else{
        return NextResponse.json({message:"nouser"}, { status: 200 });
    }
    
  } catch (error) {
    console.error('Error scraping Amazon products:', error);
    return NextResponse.json({ error: 'Failed to fetch Amazon products' }, { status: 500 });
  }
}
