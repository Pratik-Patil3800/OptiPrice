import { product_type } from "@utils/types";
import puppeteer from "puppeteer";

const scrapecromaProducts = async (search: string): Promise<product_type[] | void> => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 20
        });

        const page = await browser.newPage();
        await page.goto("https://www.croma.com/");
        await page.waitForSelector('input[id="searchV2"]');
        await page.type('input[id="searchV2"]', search);
        await page.keyboard.press('Enter');
        await page.waitForSelector('[class="product-item"]');

        const products: product_type[] = await page.evaluate(() => {
            const elements = document.querySelectorAll('[class="product-item"]');
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
                    const el = element.querySelector('[data-testid="product-img"]');
                    if (el) {
                        const imgElement = el.querySelector('img');
                        if (imgElement) {
                            product.name = imgElement.getAttribute("title") || "";
                        }
                    }
                } catch (error) {
                    console.log("No name");
                }

                try {
                    const ratingElement = element.querySelector('[class="rating-text"]');
                    if (ratingElement) {
                        product.stars = parseFloat(ratingElement.textContent || "0");
                    }
                } catch (error) {
                    console.log("No stars");
                }

                try {
                    const priceElement = element.querySelector('[class="amount plp-srp-new-amount"]');
                    if (priceElement) {
                        product.price = parseFloat(priceElement.innerHTML.replace(/[^\d.-]/g, ''));
                    }
                } catch (error) {
                    console.log("No price");
                }

                try {
                    const el = element.querySelector('[data-testid="product-img"]');
                    if (el) {
                        const linkElement = el.querySelector('a');
                        if (linkElement) {
                            product.url = "https://www.croma.com" + linkElement.getAttribute("href");
                        }
                    }
                } catch (error) {
                    console.log('No url');
                }

                try {
                    const el = element.querySelector('[class="product-img plp-card-thumbnail plpnewsearch"]');
                    if (el) {
                        const imgElement = el.querySelector('img');
                        if (imgElement) {
                            product.img = imgElement.getAttribute("src") || "";
                        }
                    }
                } catch (error) {
                    console.log('No image');
                }

                if (product.img !== "") {
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

const tarckcroma = async (search:string) => {
    try {
      const browser = await puppeteer.launch({
        headless: true, 
      });
      const page = await browser.newPage();
      await page.goto(search);
      await page.waitForSelector('[class="amount"]');
      let price = await page.evaluate(() => {
        const element=document.querySelector('[class="amount"]');
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

export  {scrapecromaProducts, tarckcroma};
