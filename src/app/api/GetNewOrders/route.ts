import fs from 'fs';
import path from 'path';



import { NextRequest, NextResponse } from "next/server";
// import { json } from 'stream/consumers';
// import { any, unknown } from 'zod';

export async function GET(req:NextRequest){

    class Order {
        constructor() {
            this.AddInfo = null; // AddInfo
            this.OrderID = null; // String
            this.ArticleList = null; // ArticleList
            this.StoreData = null; // StoreData
            this.ServerData = null; // ServerData
            this.Customer = null; // Customer
        }
    }
    
    class OrderList {
        constructor() {
            this.Order = []; // Array of Order
            this.CreateDateTime = new Date().toISOString(); // Date
        }
    }
    
    class EShopOrder {
        constructor() {
            this.OrderList = new OrderList();
        }
    }
    
    const EShopOrders = new EShopOrder();
    
    // Get all JSON files in the current directory
    const files = fs.readdirSync('temp/');
    console.log("--------", files)
    
    files.forEach(file => {
      //  if (path.extname(file) === '.json') {
            try {
                const rawData = fs.readFileSync("./temp/"+file, 'utf-8');
                const order = JSON.parse(rawData);
                EShopOrders.OrderList.Order.push(order);
            } catch (error) {
                console.error(`Error reading or parsing ${file}:`, error);
            }
    //    }
    });
    
    // Convert to JSON format with pretty printing
   // const myJSON = JSON.stringify(EShopOrders, null, 2);
    
    // Set response content-type to JSON (if using Express, for example)
    // res.setHeader('Content-Type', 'application/json');
    
   // console.log(myJSON);
    

   return NextResponse.json(EShopOrders);

    //my code 

// console.log(req)
//     const data = fs.readFileSync('temp/order_17401452.json');
// //console.log(JSON.parse(data));
// console.log(data)
// const Filereaded = JSON.parse(data);

//     return NextResponse.json(Filereaded);
}