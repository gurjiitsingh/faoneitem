"use client"

import  { createContext, useContext } from "react";


const SiteContext = createContext({
    open: false,
    deliveryType:"pickup", 
    sideBarToggle:()=>{},
    openBargerMenu:false,
    bargerMenuToggle:()=>{},
    openEmailForm:false,
    emailFormToggle:()=>{},
    chageDeliveryType:(e)=>{},
    couponDisc:{},
    setCouponDisc:(e)=>{},
    deliveryDis:{},
    setdeliveryDis:(e)=>{},
    showProductDetailM:false,
     setShowProductDetailM:(e)=>{},
     baseProductId:"",
     setBaseProductId:(e)=>{},
})

export const UseSiteContext = () =>{
     const context  = useContext(SiteContext);
     if (!context) {
        throw new Error("useCartContext must be used within a CartContextProvider");
      }
      return context;
}

export default SiteContext;