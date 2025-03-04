
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
// import { json } from 'stream/consumers';
// import { any, unknown } from 'zod';
export const revalidate = 0;

export async function PUT(req:NextRequest,res:NextApiResponse){

 console.log("Prepare time ----------------",req)
//     const data = fs.readFileSync('temp/order_174019159692.json') ;
// //console.log(JSON.parse(data));
// const Filereaded = JSON.parse(data);

   //  return NextResponse.json("ok");
    // return  res.status(200).json({ name: 'Next.js' })
     res.status(200).json({ message: 'ok' })
}