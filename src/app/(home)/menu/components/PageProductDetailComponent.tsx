"use client";

import { cartDataT } from "@/lib/types/cartDataType";
//import { TnewProductSchema } from "@/lib/types";
//import {  ProductType } from "@/lib/types/productType";
import Link from "next/link";
import React from "react";

export default function PageProductDetailComponent({
  product,
}: {
  product: cartDataT;
}) {
  console.log("----------product data----", product);
  return (
    <div className="w-full  lg:w-[50%] bg-white flex flex-row border  rounded-2xl">
      <Link
        href={{
          pathname: `productvariant/${product.id}`,
        }}
      >
        <div className="rounded-tl-2xl rounded-bl-2xl">
          <img
            src={product.image}
            className="w-[150px] rounded-tl-2xl rounded-bl-2xl"
          />
        </div>
      </Link>
      <div className="w-full flex flex-col p-3 justify-between ">
        <div className="w-full flex gap-2 justify-between ">
          <div>{product.name}</div>
          <div>&euro;{product.price}</div>
          <div>
            <Link
              href={{
                pathname: `productvariant/${product.id}`,
              }}
            >
              Select
            </Link>
          </div>
        </div>
        <div className="text-sm">{product.productDesc}</div>
        {/* <div className="flex items-center p-1 justify-center  rounded-lg gap-2 fit">
          <div>
          <ButtonDecCartProduct product={product} />
          </div>
          <div className="flex items-center h-full  justify-center w-4"><ItemTotal productId={product.id!} /></div>
          
          <div>
          <ButtonAddToCartButton product={product} />
          
          </div>
        </div> */}
      </div>
    </div>
  );
}
