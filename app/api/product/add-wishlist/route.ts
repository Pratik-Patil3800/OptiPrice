import { NextRequest, NextResponse } from 'next/server';
import { User ,Product ,ProductType} from '@models/User';
import { dbConnect } from '@utils/dbConnect';
import mongoose from 'mongoose';
import { getDataFromToken } from '@app/helper/getid';

dbConnect()
export async function POST(request: NextRequest) {
  console.log("at backend");
  const reqBody = await request.json()
  const {name, price, url,img,stars} = reqBody;
  const id=getDataFromToken(request);
  console.log(id);
  try{
    const user=await User.findById(id);
    console.log(user);
    if(user){
      console.log(name,url,price,img,stars);
        const newproduct = new Product({
            name,
            url,
            price,
            img,
            stars
        })
      
        await newproduct.save();
        console.log(newproduct._id)
        user.wishlist.push(newproduct._id);
        await user.save();
        return NextResponse.json({message: "Success"}, {status: 200});
    }
    else{
      console.log('no user')
    }
  }
  catch{
    return NextResponse.json({error: "Something went wrong"}, {status: 400});
  }
}
