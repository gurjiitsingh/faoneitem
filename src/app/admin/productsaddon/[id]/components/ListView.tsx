"use client";

type productTableProps = {
  limit?: number;
  title?: string;
  id?: string;
};

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
  // TableCaption,
} from "@/components/ui/table";

import TableRows from "./TableRows";
import {  fetchProductByBaseProductId } from "@/app/action/productsaddon/dbOperation";
import { ProductType } from "@/lib/types/productType";
//import FeaturProductUpdate from "./FeaturProductUpdate";

const ListView = ({id, title }: productTableProps) => {

  const baseProductId = id as string;
  //console.log("product addon view ----", id)
  const [productData, setProductData] = useState<ProductType[]>([]);
  // var pageNo = 1;
  // var limit = 10

  useEffect(() => {
    async function fetchProduct() {
      try {
       // const result = await fetchProducts();
       // console.log("---------", result)
        const result = await fetchProductByBaseProductId(baseProductId);
        console.log("addonproduct by baseproductid---------", result)
        setProductData(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
    
  }, []);

  // function handleDelete(id:string){
  //   console.log(id)
  // }
  // Sort posts in dec product based on date

  //   const sortedproducts: TProduct[] = [...products].sort((a, b) => {
  //     return new Date(b.date).getTime() - new Date(a.date).getTime();
  //   });

  return (
    <>
      <div className="mt-10 p-2">
        <h3 className="text-2xl mb-4 font-semibold">
          {title ? title : "Product Add ons"}
        </h3>
        <div className="bg-slate-50 rounded-lg p-1">
          <Table>
            {/* <TableCaption>Product List</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">
                   Name
                </TableHead>
                <TableHead className="hidden md:table-cell"> 
                  Ext Price
                </TableHead>
                {/* <TableHead className="hidden md:table-cell">Image</TableHead> */}

                {/* <TableHead>Category</TableHead> */}
                {/* <TableHead>Status</TableHead> */}
                 <TableHead>Desc</TableHead>
                <TableHead className="hidden md:table-cell">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData.map((product) => {
                return <TableRows key={product.id} product={product} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListView;
