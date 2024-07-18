import { NextRequest, NextResponse } from 'next/server';
import { User ,Product } from '@models/User';
import { dbConnect } from '@utils/dbConnect';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import { getDataFromToken } from '@app/helper/getid';

dbConnect()
export async function DELETE(request: NextRequest) {
  console.log("at backend");
  const { searchParams } = new URL(request.url);
  let productId  = searchParams.get('id');
  const id=getDataFromToken(request);
  if (!id) {
    return NextResponse.json({ error: "User ID not found in cookies" }, { status: 400 });
  }

  if (!productId) {
    return NextResponse.json({ error: "Product ID not provided" }, { status: 400 });
  }
  try{
    const user=await User.findById(id);
    if(user){
        user.wishlist = (user.wishlist).filter(temp => !temp.equals(productId));
        await user.save();
        await Product.findByIdAndDelete(productId);
        return NextResponse.json({message: "Success"}, {status: 200})
    }
  }
  catch{
    return NextResponse.json({error: "Something went wrong"}, {status: 400})
  }
}

