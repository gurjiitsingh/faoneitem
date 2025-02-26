'use client'

import { ProductType } from '@/lib/types/productType';
import { useCartContext } from '@/store/CartContext';


export  function DecFromCart({product}:{product:ProductType}) {

  const {  removeCartProduct } =  useCartContext();
   
    removeCartProduct(product)
 

}

  
  
  
  