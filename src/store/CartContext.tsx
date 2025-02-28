import { createContext, useContext } from "react";
//import { ProductType } from  '@/lib/types/ProductType'
//import { ProductTypeT } from "@/lib/types/ProductTypeype";

import { ProductType } from "@/lib/types/productType";
import { addressT } from "@/lib/types/addressType";
interface CartContextType {
  counter: number;
  productTotalCost: number;
  cartData: ProductType[];
  address: addressT;
  addAddress: (a:addressT) => void;

  //getAddress:()=>{};
  addProduct: (c: ProductType) => void;
  addProductToCart: (c: ProductType ) => void;
  decCartProduct: (c: ProductType) => void;
  decCartProductAll: (c: ProductType) => void;
  removeCartProduct: (c: ProductType | undefined) => void;
  emptyCart: () => void;
  endTotalG: number;
  setEndTotalG: (c: number) => void;
  totalDiscountG: number;
  setTotalDiscountG: (c: number) => void;
}

//const CartContext = createContext<CartContextType | null>(null);

const CartContext = createContext<CartContextType>({
  counter: 0,
  endTotalG: 0,
  setEndTotalG: () => {},
  productTotalCost: 0,
  cartData: [],
  address: {
    name: "",
    mobNo: "",
    city: "",
    state: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
    userId: "",
  },
  addAddress: (a:addressT) => {return a},
  // getAddress:()=>{},
  addProduct: () => {},
  addProductToCart: (p:ProductType) => {return p},
  decCartProduct: () => {},
  decCartProductAll: () => {},
  removeCartProduct: () => {},
  emptyCart: () => {},
  totalDiscountG: 0,
  setTotalDiscountG: () => {},
});

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

export default CartContext;
