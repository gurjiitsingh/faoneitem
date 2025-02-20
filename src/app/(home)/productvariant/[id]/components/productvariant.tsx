"use client";

//import { cartDataT } from "@/lib/types/cartDataType";
//import { TnewProductSchema } from "@/lib/types";
import { ProductType } from "@/lib/types/productType";
//import Link from "next/link";
import React from "react";
// : { product: cartDataT,addExtra:()=>void }
export default function Productvariant({
  product,
  addExtra,
}: {
  product: ProductType;
  addExtra: (e: {e:{name:string,extraPrice:string}}) => void;
}) {
  // console.log("----------product data----", product);

  return (
    <div key={product.name}>
      <div className="w-full md:w-[49%] lg:w-[32%] bg-white flex flex-row border-b ">
        <div className="w-full flex flex-col p-3 justify-between">
          <div className="w-full flex justify-between gap-2">
            <div>
              <input
                type="radio"
                name="extra"
                value={product.id}
                // checked={}
                onChange={() => {
                  addExtra({name:product.name,price:product.price});
                }}
              />
            </div>
            <div>{product.name}</div>
            <div>&euro;{product.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
