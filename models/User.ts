import { Schema, Types, model } from 'mongoose';
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:false
    },
    wishlist: [{
        _id: {
            type: Types.ObjectId,
            ref: 'product'
        },
    }],
});

const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    stars:{
        type:String,
        required:false
    },
    price:{
        type:String,
        required:true
    },
    target_price:{
        type:String,
        required:false
    },
});

interface ProductType extends Document {
    name: string;
    url: string;
    price: string;
    img:string;
    stars?:string;
    target_price?: string;
}
interface UserType extends Document {
    name: string;
    email: string;
    password: string;
    otp?: string;
    wishlist: Types.ObjectId[];
}

const User=model<UserType>('users',UserSchema);
const Product=model<ProductType>('product',productSchema);
export { User, Product };
export type { UserType, ProductType};
