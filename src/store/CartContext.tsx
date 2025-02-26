
import  { createContext, useContext } from "react";
//import { ProductType } from  '@/lib/types/ProductType'
//import { ProductTypeT } from "@/lib/types/ProductTypeype";

import { ProductType } from "@/lib/types/productType";
interface CartContextType {
  counter: number;
  productTotalCost: number;
  cartData: ProductType[] ;
  address:{} ;
  addAddress:{};
  
  //getAddress:()=>{};
  addProduct: ProductType | {};
  addProductToCart:(c:ProductType | undefined)=>void
  decCartProduct:(c:ProductType)=>void
  decCartProductAll:(c:ProductType)=>void
   removeCartProduct:(c:ProductType | undefined)=>void
   emptyCart:()=>void
   endTotalG:number;
  setEndTotalG:(c:number)=>void;
}

//const CartContext = createContext<CartContextType | null>(null);

const CartContext = createContext<CartContextType>({ 
  counter: 0,
  endTotalG:0,
  setEndTotalG:()=>{},
  productTotalCost:0,
  cartData: [],
  address: {},
  addAddress:()=>{},
 // getAddress:()=>{},
  addProduct:()=>{},
  addProductToCart:()=>{},
  decCartProduct:()=>{},
  decCartProductAll:()=>{},
  removeCartProduct:()=>{},
  emptyCart:()=>{}
  
  });

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};


export default CartContext


