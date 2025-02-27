"use client";

import React, { useEffect, useState } from "react";
import { fetchProductByBaseProductId } from "@/app/action/productsaddon/dbOperation";
import { ProductType } from "@/lib/types/productType";
import { useParams } from "next/navigation";
import Productvariant from "./components/productvariant";
import { fetchProductById } from "@/app/action/productsbase/dbOperation";
import { ButtonDecCartProduct } from "@/components/CartPageComponent/ButtonDecCartProduct";
import { ButtonAddToCartButton } from "@/components/CartPageComponent/ButtonAddToCart";
import { fetchProductSauces } from "@/app/action/productsauces/dbOperation";
import Link from "next/link";
import Productsauces from "./components/productsauces";

import { useCartContext } from "@/store/CartContext";
import { TProduct } from "@/lib/types";

//import FeaturProductUpdate from "./FeaturProductUpdate";
type Tsize = { name: string; price: string };
type Tsize1 = { extra: { state: string; name: string; extraPrice: string } };
type TcartProduct = {
  id: string;
  baseProductId: string;
  productDesc: string;
  productCat: string;
  image: string;
  isFeatured: boolean;
  name: string;
  price: string;
};
const ListView = () => {
  const params = useParams();
  const baseProductId = params.id as string;
  console.log("baseProduct id --------", baseProductId);
  const [productAddOn, setProductAddon] = useState<ProductType[]>([]);
  const [productBase, setProductBase] = useState<ProductType>();
  const [cartItem, setCartItem] = useState<ProductType | undefined>();
  const [productSauces, setProductSaces] = useState<ProductType[]>([]);
  const [sauceList, setSauceList] = useState<ProductType[]>([]);
  const [size, setSize] = useState<Tsize>();
  const [change, setChange] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  const { removeCartProduct, addProductToCart } = useCartContext();

  useEffect(() => {
     async function fetchProduct() {
      try {
        const baseProduct = await fetchProductById(baseProductId);
        setProductBase(baseProduct);
        setCartItem(baseProduct);
        console.log("addon product ---------", baseProduct);
        const productAddon = await fetchProductByBaseProductId(baseProductId);
        setProductAddon(productAddon);
        const sauces = await fetchProductSauces();
        setProductSaces(sauces);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, []);

  //   useEffect(() => {
  //  //   console.log("saucelist and size changed ------");
  //     itemOrderModification();
  //   }, [change]);

  let cartProduct = {} as ProductType;

  function addExtra({name,price}:{name:string,price:string}) {
   // const extra = {name1,price};
   //console.log({name,price})
    setSize({name:name,price:price});
    setChange((state) => !state);
     itemOrderModification();
  }

  // function addSauce(extra: {extra:{state:string,name:string,extraPrice:string}}) {
  //   //Tsize1

  //   if (extra.state) {
  //     addProductToCart(extra);
  //   } else {
  //     removeCartProduct(extra);
  //   }

  //   // addToSauceListLocal(extra)
  // }

  // function addToSauceListLocal(extra) {
  //   const isItemInCart = sauceList.find((cartItem) => cartItem.id === extra.id); // check if the item is already in the cart
  //   let souceNotFound;
  //   if (isItemInCart === undefined) souceNotFound = false;
  //   else souceNotFound = true;

  //   if (souceNotFound) {
  //     setSauceList(sauceList.filter((cartItem) => cartItem.id !== extra.id));
  //   } else {
  //     setSauceList([
  //       ...sauceList,
  //       {
  //         ...extra,
  //       },
  //     ]);
  //   }
  //   setChange((state) => !state);
  // }

  function itemOrderModification() {
    //console.log("Order detail ------- ", size, sauceList);

    const saucePrice = sauceList.reduce(function (acc, obj) {
      return acc + +obj.price;
    }, 0);
    // const sizeI = +size;

    const priceBase = productBase?.price as string;
    const finalPrice = (+priceBase + saucePrice).toString();
    const id = baseProductId + "-" + size?.name;
   // const id = baseProductId;
    //  console.log("product to save-----", productBase);
    const pdesc = productBase?.productCat as string;
    const img = productBase?.image as string;
    const isF = productBase?.isFeatured as boolean;
    const pName = productBase?.name as string;
    const pDesc = size?.name as string;

    //  id: string;
    //   baseProductId: string;
    //    productDesc: string;
    //    productCat: string;
    //     image: string;
    //     isFeatured: boolean;
    //      name: string;
    //       price: string;
    //       purchaseSession: string;
    //       quantity: string;
    //       status: string;

    cartProduct = {
      id: id,
      baseProductId,
      productDesc: pDesc,
      productCat: pdesc,
      image: img,
      isFeatured: isF,
      name: pName,
      price: finalPrice,
      purchaseSession: "",
      quantity: 1,
      status: "",
    } as ProductType;
    //console.log("final cart product ----------", cartProduct)
    setCartItem(cartProduct);
  }

  // function addOrderToCart(){
  //   AddToCart();

  // }

  return (
    <>
      <div className="overflow-hidden">
        <div className="container flex flex-col mx-auto py-5 px-2 ">
          <div className="w-full  bg-white flex flex-row border  rounded-tl-2xl rounded-tr-2xl">
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

          <div className="flex flex-col  flex-wrap ">
            {productAddOn.map((product, i) => {
              return (
                <Productvariant key={i} product={product} addExtra={addExtra} />
              );
            })}
          </div>
          <div className="w-full flex bg-white font-semibold text-[#222] text-center py-3  px-6">
            Add Sauces
          </div>
          <div className="flex flex-col  flex-wrap ">
            {productSauces.map((product, i) => {
              return (
                // <Productsauces key={i} product={product} addSauce={addSauce} />
                <Productsauces key={i} product={product} />
              );
            })}
          </div>
          <div className="w-full   bg-white flex flex-row border  rounded-bl-2xl rounded-br-2xl">
            <div className="flex items-center p-1 justify-center  rounded-lg gap-2 fit">
              <div>
                <ButtonDecCartProduct product={cartItem} />
              </div>
              {/* <div className="flex items-center h-full  justify-center w-4"><ItemTotal productId={product.id!} /></div> */}

              <div>
           {size  &&     <ButtonAddToCartButton product={cartItem} />}
                {/* <button className='border px-3 py-1 rounded-xl bg-green-500' onClick={addOrderToCart}></button> */}
              </div>
            </div>
          </div>
          <div className="w-full   ">
            <Link href={"/"}>
              <div className="mt-2 py-2 px-3 bg-red-600 rounded-2xl text-center text-white">
                Shop more
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListView;
