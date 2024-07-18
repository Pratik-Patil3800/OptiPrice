import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@models/User';
import { dbConnect } from '@utils/dbConnect';

dbConnect()
export async function POST(request: NextRequest) {
  console.log("at backend");
  const reqBody = await request.json()
  const {target_price} = reqBody;
  const { searchParams } = new URL(request.url);
  let productId  = searchParams.get('id');

  if (!productId) {
    return NextResponse.json({ error: "Product ID not provided" }, { status: 400 });
  }
  try{
    const product=await Product.findById(productId);
    product!.target_price=target_price;
    await product?.save();
    return NextResponse.json({message: "Success"}, {status: 200});
  }
  catch{
    return NextResponse.json({error: "Something went wrong"}, {status: 400})
  }
}

