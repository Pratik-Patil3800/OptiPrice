
import { NextResponse } from 'next/server';
import sendMail from '@app/helper/mailsend';

export async function GET(request: Request) {

  try {
    // sendMail();
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
