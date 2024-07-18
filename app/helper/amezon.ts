import puppeteer from 'puppeteer';
import type { product_type } from '@utils/types';

const amazonProducts = async (search: string): Promise<product_type[] | void> => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 20
        });

        const page = await browser.newPage();
        await page.goto("https://www.amazon.in/");
        await page.waitForSelector('input[id="twotabsearchtextbox"]');
        await page.type('input[id="twotabsearchtextbox"]', `${search}`);
        await page.keyboard.press('Enter');
        await page.waitForSelector('[data-csa-c-type="item"]');

        const products: product_type[] = await page.evaluate(() => {
            const elements = document.querySelectorAll('[data-csa-c-type="item"]');
            const products: product_type[] = [];

            elements.forEach(element => {
                const product: product_type = {
                    name: "",
                    stars: 0,
                    price: 0,
                    url: "",
                    img: "",
                };

                try {
                    const nameElement = element.querySelector('[class="a-size-medium a-color-base a-text-normal"]');
                    if (nameElement) {
                        product.name = nameElement.innerHTML;
                    }
                } catch (error) {
                    console.log("No name");
                }

                try {
                    const starsElement = element.querySelector('[class="a-icon-alt"]');
                    if (starsElement) {
                        product.stars = parseFloat(starsElement.innerHTML.split(' ')[0]); // Extract the number from the rating text
                    }
                } catch (error) {
                    console.log("No stars");
                }

                try {
                    const priceElement = element.querySelector('[class="a-offscreen"]');
                    if (priceElement) {
                        product.price = parseFloat(priceElement.innerHTML.replace(/[^0-9.-]+/g, "")); // Extract the numeric value
                    }
                } catch (error) {
                    console.log("No price");
                }

                try {
                    const urlElement = element.querySelector('[class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]');
                    if (urlElement) {
                        product.url = "https://www.amazon.in" + urlElement.getAttribute("href");
                    }
                } catch (error) {
                    console.log('No url');
                }

                try {
                    const imgElement = element.querySelector('[class="s-image"]');
                    if (imgElement) {
                        product.img = imgElement.getAttribute("src") || "";
                    }
                } catch (error) {
                    console.log('No image');
                }

                if (product.img) {
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

const tarckamazon = async (search:string) => {
    try {
      const browser = await puppeteer.launch({
        headless: true, 
      });
      const page = await browser.newPage();
      await page.goto(search);
      await page.waitForSelector('[class="a-price-whole"]');
      let price = await page.evaluate(() => {
        const element=document.querySelector('[class="a-price-whole"]');
        if(element){
            return parseFloat(element.innerHTML.replace(/[^0-9.-]+/g, ""));
        }
        else{
            return 0;
        }
      });
      await browser.close();
    } catch (e) {
      console.log(e);
    }
      return 0;
    };

export  {amazonProducts, tarckamazon};
