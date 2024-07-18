import cron from 'node-cron'
import { Product,User, UserType } from '@models/User';
import { tarckamazon } from './amezon';
import { tarckflipcart } from './flipcart';
import { tarckcroma } from './croma';
import sendMail from './mailsend';

const shedul = async () => {
    
    cron.schedule('* * * *', async() => {
        const products=await Product.find({target_price:{$exists: true, $ne: null}});
        products.forEach(async(product)=>{
            const url=product.url;
            let price=0;
            if(url[13]==='a'){
                price=await tarckamazon(url);
            }
            else if(url[13]==='f'){
                price=await tarckflipcart(url);
            }
            else if(url[13]==='c'){
                price=await tarckcroma(url);
            }
            if(product.target_price && price!=0 && price <= parseFloat(product.target_price)){
                const users=await User.find({wishlist:{$in:[product._id]}});
                for(const user of users){
                    const To=user.email;
                    const Subject="Price Alert";
                    const Body=`
                        <strong>Price Drouped</strong>
                        <br>
                        <h1>The price for ${product.name} has dropped to ₹${price}. It meets your target price of ₹${product.target_price}.</h1>
                        <a href={product.url} target="_blank" rel="noopener noreferrer" >View Product</a>
                    `;
                    sendMail(Subject,Body,To);
                }
            }
        })
    });
};

export default shedul;