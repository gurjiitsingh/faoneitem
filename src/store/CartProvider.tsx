"use client";

import React, {  useEffect, useState } from "react";
import CartContext from "./CartContext";
import { ProductType } from "@/lib/types/productType";
import { addressT } from "@/lib/types/addressType";

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  //var now1 = Date.now().toString();

  const [cartData, setCartData] = useState<ProductType[]>([]);
   const [address, setAddress] = useState<addressT>({
    name: "",
    mobNo: "",
    city: "",
    state: "",
    zipCode: "",
    addressLine1: "",
    addressLine2: "",
    userId: "",});
   const [counter, setCounter] = useState<number>(0);
   const [endTotalG, setEndTotalL] =useState<number>(0);
  const [productTotalCost, setProductTotalCost] = useState<number>(0);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [  totalDiscountG, setTotalDiscountL] = useState<number>(0);

  useEffect(() => {

    if (window.localStorage.getItem("cart_product_data_id") == null) {
      const cartItemDateId = Date.now().toString();
      window.localStorage.setItem("cart_product_data_id", cartItemDateId);
    }
   
    if (isUpdated) {
      window.localStorage.setItem("cart_product_data", JSON.stringify(cartData));
    } else {
      const cart_data_localstorage: any =
      window.localStorage.getItem("cart_product_data");

      const data = JSON.parse(cart_data_localstorage);
      setCartData([]);
      if (data) {
        data.map((item: ProductType) => {
          setCartData((prevState) => {
            return [...prevState, { ...item }];
          });
        });
      }
    }
    setIsUpdated(false);
    cartTotal();
    //console.log("useEffe 0", cartData)
  }, [cartData]);

  useEffect(() => {
  
    const cart_data_localstorage: any =
    window.localStorage.getItem("cart_product_data");

    const data = JSON.parse(cart_data_localstorage);
    setCartData([]);

    if (data) {
      data.map((item: ProductType) => {
        setCartData((prevState) => {
          return [...prevState, { ...item }];
        });
      });
    }

    setIsUpdated(false);
    cartTotal();
  }, []);

  function cartTotal() {
    let total = 0;
    if (cartData.length > 0) {
      cartData.forEach((element) => {
        total =
          total +
        // parseInt(element.quantity!) * parseFloat(element.price).toFixed(2);
        element.quantity! * +element.price;
      });
    }

    setProductTotalCost(total);
    setIsUpdated(true);
  }

  function addProductToCart(newProduct: ProductType ) {

    console.log("float price---------", newProduct.price)

    const isItemInCart = cartData.find(
      (cartItem) => cartItem.id === newProduct?.id
    ); // check if the item is already in the cart
//console.log("new product in context store---------", newProduct?.quantity)
    if (isItemInCart) {
      setCartData(
        cartData.map(
          (
            cartItem // if the item is already in the cart, increase the quantity of the item
          ) =>
            cartItem.id === newProduct?.id
              ? { ...cartItem, quantity: cartItem.quantity! + newProduct.quantity! }
              : cartItem // otherwise, return the cart item
        )
      );
    } else {
      if (typeof window !== 'undefined') {
      setCartData([
        ...cartData,
        {
          ...newProduct!,
          quantity: newProduct.quantity!,
        //  purchaseSession: localStorage.getItem("cart_product_data_id"),
          status: "draft",
        },
      ]); // if the item is not in the cart, add the item to the cart
    }
    }
    // setIsUpdated(true);
  }

  function decCartProduct(decProduct: ProductType) {
    //this funciton dec product almost to 1
    setCartData(
      cartData.map((item: ProductType) => {
        return item.id === decProduct.id
          ? item.quantity! > 1
            ? { ...item, quantity: item.quantity! - 1 }
            : item
          : item;
      })
    );
    setIsUpdated(true);
  }
  function decCartProductAll(decProduct: ProductType) {
    //this funciton dec product almost to 0
    //removeCartProduct
    setCartData(
      cartData.map((item: ProductType) => {
        return item.id === decProduct.id
          ? item.quantity! > 0
            ? { ...item, quantity: item.quantity! - 1 }
            : item
          : item;
      })
    );
    setIsUpdated(true);
  }

  function removeCartProduct(item: ProductType | undefined) {
    const isItemInCart = cartData.find((cartItem) => cartItem.id === item?.id) as ProductType ;
  //  console.log("item qu-- ", isItemInCart.quantity!);
    if (isItemInCart.quantity! <= 1) {
      setCartData(cartData.filter((cartItem) => cartItem.id !== item?.id)); // if the quantity of the item is 1, remove the item from the cart
    } else {
      setCartData(
        cartData.map((cartItem) =>
          cartItem.id === item?.id
            ? { ...cartItem, quantity: cartItem.quantity! - 1 } // if the quantity of the item is greater than 1, decrease the quantity of the item
            : cartItem
        )
      );
    }

    // setCartData(
    //   cartData.filter((item: ProductType) => {
    //     return item.productId !== remProduct.productId;
    //   })
    // );

    setIsUpdated(true);
  }

  function emptyCart() {
    setCartData([]);

    setIsUpdated(true);
  }
  function addProduct(newProduct:ProductType) {
    // console.log("new add product", newProduct)
    // const product = {
    //   id:"kljljl",
    //   name:"test"
    // }
    //     setCartData((prev)=>{
    //       console.log(prev, product)
    //       return [...prev, product]
    //     })

    const isItemInCart = cartData.find(
      (cartItem) => cartItem.id === newProduct.id
    ); // check if the item is already in the cart

    if (isItemInCart) {
      setCartData(
        cartData.map(
          (
            cartItem // if the item is already in the cart, increase the quantity of the item
          ) =>
            cartItem.id === newProduct.id
              ? { ...cartItem, quantity: cartItem.quantity! + 1 }
              : cartItem // otherwise, return the cart item
        )
      );
    } else {
      if (typeof window !== 'undefined') {
      setCartData([
        ...cartData,
        {
          ...newProduct,
          quantity: 1,
          purchaseSession: localStorage.getItem("cart_product_data_id"),
          status: "draft",
        },
      ]); // if the item is not in the cart, add the item to the cart
    }}
  }
  // const getCartTotal = () => {
  //   return cartData.reduce(
  //     (total, item) => total + (+item.price) * item.quantity!,
  //     0
  //   ); // calculate the total price of the items in the cart
  // };

  function addAddress(address:addressT) {
    if (typeof window !== 'undefined') {
    localStorage.setItem("customer_address", JSON.stringify(address));
    }
  }
  // function getAddress() {
  //   const address = window.localStorage.getItem("customer_address");
  //   setAddress(JSON.parse(address));
  // }

  
       function setEndTotalG(t:number){
setEndTotalL(t)
       }

      
 function setTotalDiscountG(d:number){
  setTotalDiscountL(d)
 }

  return (
    <CartContext.Provider
      value={{
        cartData,
        address,
        addProduct,
        addAddress,
        endTotalG,
        setEndTotalG,
      //  getAddress,
        counter,
        productTotalCost,
        addProductToCart,
        decCartProduct,
        decCartProductAll,
        removeCartProduct,
        emptyCart,
        totalDiscountG,
  setTotalDiscountG,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
