"use client";

type productTableProps = {
  limit?: number;
  title?: string;
  id?: string;
};

import React, { useEffect, useState } from "react";

import { fetchProductByBaseProductId } from "@/app/action/productsaddon/dbOperation";
import { ProductType } from "@/lib/types/productType";
import { useParams } from "next/navigation";
import Productvariant from "./components/productvariant";
//import Link from "next/link";
import { fetchProductById } from "@/app/action/productsbase/dbOperation";
import { ButtonDecCartProduct } from "@/components/CartPageComponent/ButtonDecCartProduct";
import { ButtonAddToCartButton } from "@/components/CartPageComponent/ButtonAddToCart";
//import FeaturProductUpdate from "./FeaturProductUpdate";

const ListView = () => {
  const params = useParams();
  const baseProductId = params.id as string;
  //console.log("this is product variant ------", params);
  const [productAddOn, setProductAddon] = useState<ProductType[]>([]);
  const [productBase, setProductBase] = useState<ProductType>();

  useEffect(() => {
    async function fetchProduct() {
      try {
        // const result = await fetchProducts();
        // console.log("---------", result)
        const result = await fetchProductByBaseProductId(baseProductId);
        //console.log("addonproduct by baseproductid---------", result);
        setProductAddon(result);
        const baseProduct = await fetchProductById(baseProductId);
        console.log("basepordut -----------", baseProduct);
        setProductBase(baseProduct);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, []);
let cartProduct = {};
  function addExtra(extra){
    console.log("-----------",extra)
    console.log("-----------",productBase)
    cartProduct = productBase;
    const priceBase = productBase?.price as string;
    const finalPrice = +priceBase +(+extra.price)
   
    cartProduct = {
      Desc:extra.name,
      category:productBase?.category,
      image:productBase?.image,
      isFeatured:productBase?.isFeatured,
      name:productBase?.name,
      price:finalPrice
    }
    console.log(";;;;;;;", cartProduct)

  }
 
  return (
    <>
      <div className="overflow-hidden">
        <div className="container mx-auto py-5 p-1">
          <div className="w-full md:w-[49%] lg:w-[32%] bg-white flex flex-row border  rounded-tl-2xl rounded-tr-2xl">
            <div className="rounded-tl-2xl ">
              <img
                src={productBase?.image}
                className="w-[150px] rounded-tl-2xl "
              />
            </div>

            <div className="w-full flex flex-col p-3 justify-between ">
              <div className="w-full flex gap-2 justify-between ">
                <div>{productBase?.name}</div>
                <div>&euro;{productBase?.price}</div>
              </div>
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

          <div className="flex flex-col md:flex-row flex-wrap ">
            {productAddOn.map((product) => {
              return <Productvariant key={product.id} product={product} addExtra={addExtra} />;
            })}
          </div>
<div className="w-full bg-white flex flex-row border  rounded-bl-2xl rounded-br-2xl">
          <div className="flex items-center p-1 justify-center  rounded-lg gap-2 fit">
            <div>
              <ButtonDecCartProduct product={productBase} />
            </div>
            {/* <div className="flex items-center h-full  justify-center w-4"><ItemTotal productId={product.id!} /></div> */}

            <div>
              <ButtonAddToCartButton product={productBase} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default ListView;
