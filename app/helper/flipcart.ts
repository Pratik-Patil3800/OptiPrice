
import { product_type } from '@utils/types';
import puppeteer from 'puppeteer';

const flipcartproducts = async (search: string):Promise<product_type[] | void> => {
    try {
        const browser = await puppeteer.launch({
            headless: false, 
            slowMo: 20 
        });

        const page = await browser.newPage();
        await page.goto("https://www.flipkart.com/");
        await page.waitForSelector('input[type="text"]');
        await page.type('input[type="text"]', `${search}`);
        await page.keyboard.press('Enter');
        await page.waitForSelector('[class="_75nlfW"]');
        
        const products: product_type[] = await page.evaluate(() => {
            const elements = document.querySelectorAll('[class="_75nlfW"]');
            const products :product_type[]= [];
            
            
            elements.forEach(element => {
                const product = {
                    name: "",
                    stars: 0,
                    price: 0,
                    url: "",
                    img: "",
                  };
                  try {
                    const nameElement= element.querySelector('[class="KzDlHZ"]');
                    if(nameElement){
                        product.name=nameElement.innerHTML;
                    }
                  } catch (error) {
                    console.log("No name");
                  }
                  try {
                    const starsElement = element.querySelector('[class="XQDdHH"]');
                    if (starsElement) {
                        product.stars = parseFloat(starsElement.innerHTML.split(' ')[0]); // Extract the number from the rating text
                    }
                  } catch (error) {
                    console.log("No stars");
                  }
                  try {
                    const priceElement = element.querySelector('[class="Nx9bqj _4b5DiR"]');
                    if (priceElement) {
                        product.price = parseFloat(priceElement.innerHTML.replace(/[^0-9.-]+/g, "")); // Extract the numeric value
                    }
                  } catch (error) {
                    console.log("No price");
                  }
                  try {
                    const urlElement = element.querySelector('[class="CGtC98"]');
                    if (urlElement) {
                        product.url ="https://www.flipkart.com" + urlElement.getAttribute("href");
                    }
                  } catch (error) {
                    console.log('no url')
                  }
                  try {
                    const imgElement = element.querySelector('[class="DByuf4"]');
                    if (imgElement) {
                        product.img = imgElement.getAttribute("src") || "";
                    }
                  } catch (error) {
                    console.log('No image')
                  }
                  if(product.img!=""){
                    products.push(product);
                  }
                });
                return products;
            });

        await browser.close();
        return products;
    } catch (error) {
        console.error(error);
    }
  };

  const tarckflipcart = async (search:string) => {
    try {
      const browser = await puppeteer.launch({
        headless: true, 
      });
      const page = await browser.newPage();
      await page.goto(search);
      await page.waitForSelector('[class="Nx9bqj CxhGGd"]');
      let price = await page.evaluate(() => {
        const element=document.querySelector('[class="Nx9bqj CxhGGd"]');
        if(element){
            return parseFloat(element.innerHTML.replace(/[^0-9.-]+/g, ""));
        }
        else{
            return 0;
        }
      });
      console.log('Price:', price);

      await browser.close();
    } catch (e) {
      console.log(e);
    }
    return 0;
      
    };

  export  {flipcartproducts, tarckflipcart};