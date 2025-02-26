'use client'
import { useCartContext } from '@/store/CartContext';

import { ProductType } from '@/lib/types/productType';

export  function AddToCart({product}:{product:ProductType}) {
 
 
  const ctx = useCartContext();

   ctx.addProductToCart(product);
 

 
}
