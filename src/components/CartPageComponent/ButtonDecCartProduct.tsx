'use client'
import React from 'react'
import { IoMdRemove } from 'react-icons/io';

import { useCartContext } from '@/store/CartContext';
import { ProductType } from '@/lib/types/productType';


export  function ButtonDecCartProduct({product}:{product:ProductType | undefined}) {

  const {  removeCartProduct } =  useCartContext();

  console.log("product to add ---------",product)
  
  function decItemFromCart(product:ProductType | undefined){
    
    removeCartProduct(product)
    //decCartProductAll(product)
  }

  return (
    <button onClick={()=>decItemFromCart(product)} className='border px-3 py-1 rounded-xl'> <IoMdRemove /></button>
  )
}




// export  function ButtonDecCartProduct({product}) {

 
//   const ctx = useCartContext();

//   function decCartProduct(product){
//     //console.log("ljkklklk", product)
  
//    // ctx.addProduct(product);
//    ctx.decCartProduct(product);
//   }

//   return (
//     <button
//     className=" rounded-sm bg-slate-300 p-1"
//     onClick={decCartProduct.bind(null, product)}
//   >
//     <IoMdRemove />
//   </button>
//   )
// }  
  
  
  
  