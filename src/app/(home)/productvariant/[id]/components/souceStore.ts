import { cartDataT } from "@/lib/types/cartDataType";
import { useState } from "react";

export function AddsauceToCart(newsauce, sauceList, setSauceList) {
 // const [cartData, setCartData] = useState<cartDataT[]>([]);

console.log("sauce to add -------", newsauce)
    const isItemInCart = sauceList.find(
      (cartItem) => cartItem.id === newsauce.id
    ); // check if the item is already in the cart

    if (isItemInCart) {
        setSauceList(
        //     sauceList.map(
        //   (
        //     cartItem // if the item is already in the cart, increase the quantity of the item
        //   ) =>
        //     cartItem.id === newsauce.id
        //       ? { ...cartItem, quantity: cartItem.quantity + 1 }
        //       : cartItem // otherwise, return the cart item
        // )

        sauceList.map((item: cartDataT) => {
        return item.id === newsauce.id ? item.quantity > 1  ? { ...item, quantity: item.quantity - 1 } : item : item;
      })


      );
    } else {
      if (typeof window !== 'undefined') {
        sauceList([
        ...sauceList,
        {
          ...newsauce,
          quantity: 1,
        //  purchaseSession: localStorage.getItem("cart_sauce_data_id"),
          status: "draft",
        },
      ]); // if the item is not in the cart, add the item to the cart
    }
    }
    // setIsUpdated(true);
  }