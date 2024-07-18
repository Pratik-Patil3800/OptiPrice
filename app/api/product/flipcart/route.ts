
import type { NextApiRequest, NextApiResponse } from 'next';
import { product_type } from '@utils/types';
import {flipcartproducts} from '@app/helper/flipcart';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("atbackend");
  const { searchParams } = new URL(req.url!);
  const search = searchParams.get('search');

  if (typeof search !== 'string') {
    return NextResponse.json({ error: 'Invalid search query' }),{status:400};
  }

  try {
    const products: product_type[] | void = await flipcartproducts(search);
    if (!products) {
      throw new Error('No products found');
    }
    NextResponse.json(products),{status:200};
  } catch (error) {
    console.error('Error scraping Amazon products:', error);
    NextResponse.json({ error: 'Failed to fetch Amazon products' }),{status:500};
  }
}
