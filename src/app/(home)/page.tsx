"use client";
import { fetchProducts } from "@/app/action/products/dbOperation";
import React, { useEffect, useState } from "react";
import PageProductDetailComponent from "./menu/components/PageProductDetailComponent";
import { ProductType } from "@/lib/types/productType";

//import { TnewProductSchema } from '@/lib/types';
// import {  TnewProductSchema } from '@/lib/type/productType';

export default function Page() {
  // const products = await fetchProducts();
  const [products, setProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    async function fetchproductData() {
      const productData = await fetchProducts();

      setProduct(productData);
    }
    fetchproductData();
  }, []);

  return (
    <div className="overflow-hidden min-h-screen">
      <div className="container mx-auto pt-7 p-1">
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-3">
          {products.map((product, i) => {
            return <PageProductDetailComponent key={i} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
