import { NextResponse } from 'next/server';
import {scrapecromaProducts} from '@app/helper/croma';
import { product_type } from '@utils/types';

export async function GET(request: Request) {
  console.log("at backend");
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  if (!search) {
    return NextResponse.json({ error: 'Invalid search query' }, { status: 400 });
  }

  try {
    const products: product_type[] | void = await scrapecromaProducts(search);
    if (!products) {
      throw new Error('No products found');
    }
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error scraping Amazon products:', error);
    return NextResponse.json({ error: 'Failed to fetch Amazon products' }, { status: 500 });
  }
}
