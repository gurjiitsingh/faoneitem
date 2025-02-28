
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
// import { json } from 'stream/consumers';
// import { any, unknown } from 'zod';

export async function POST(req:NextRequest,res:NextApiResponse){
// THIS API ENDPOINT RECEIVE STATUS
//  console.log(req.body.trackingstatus)
//  console.log(req.body.ReadableStream)
 const myResponse =  req.body;
 console.log(myResponse);
//     const data = fs.readFileSync('temp/order_174019159692.json') ;
// //console.log(JSON.parse(data));
// const Filereaded = JSON.parse(data);

   //  return NextResponse.json("ok");
    // return  res.status(200).json({ name: 'Next.js' })
   //  res.status(200).json({ message: 'ok' })
    return NextResponse.json({"ok":"kk"});
}