"use client";

//import { cartDataT } from "@/lib/types/cartDataType";
//import { TnewProductSchema } from "@/lib/types";
import { ProductType } from "@/lib/types/productType";
//import Link from "next/link";
import React from "react";
// : { product: cartDataT,addExtra:()=>void }
export default function Productvariant({
  product,
  addSauce,
}: {
  product: ProductType;
  addSauce: (e: {e:{name:string,extraPrice:string}}) => void;
}) {
 //  console.log("----------product data----", product.id);

  return (
   
      <div className="w-full  bg-white flex flex-row border-b ">
        <div className="w-full flex flex-col p-3 justify-between">
          <div className="w-full flex justify-between gap-2 ">
            <div className="flex gap-4 justify-start">
            <div>
              <input
                type="checkbox"
                name="extra"
             
                // checked={}
                onChange={(e) => {
                  addSauce({state:e.target.checked,name:product.name,price:product.price, id:product.id,productDesc:product.productDesc});
                }}
              />
            </div>
            <div className="font-thin">{product.name}</div>
            </div>
            <div className="font-thin">&euro;{product.price}</div>
          </div>
        </div>
      </div>
   
  );
}
