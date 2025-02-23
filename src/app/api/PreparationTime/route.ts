import fs from 'fs';
import { NextRequest, NextResponse } from "next/server";
// import { json } from 'stream/consumers';
// import { any, unknown } from 'zod';

export async function PUT(req:NextRequest,res:NextResponse){

console.log(req)
    const data = fs.readFileSync('temp/order_174019159692.json');
//console.log(JSON.parse(data));
const Filereaded = JSON.parse(data);

    return NextResponse.json(Filereaded);
}