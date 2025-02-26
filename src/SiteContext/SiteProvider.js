"use client"
import { boolean, number, string } from "zod";
import SiteContext from "./SiteContext";
import { useState } from 'react'

export const SiteProvider = ({children}) =>{

    const setCouponDiscType ={
        couponDesc:{},
isFeatured:boolean,
minSpend:number,
name:string,
price:string,
productCat:string,
deliveryDis:{},
setdeliveryDis:(e)=>{}

 }

const [open, setIsOpen] = useState();
const [openBargerMenu, setOpenBargerMenu] = useState();
const [openEmailForm, setEmailFormToggle] = useState();
const [deliveryType, setDeliveryType] = useState();
const [couponDisc, setCouponDiscU] = useState({});
const [deliveryDis, setdeliveryDisU] = useState({});
function togleMenu(){
        setIsOpen(!open);
    }
function bargerMenuToggle(){
    setOpenBargerMenu(!openBargerMenu);
}
function chageDeliveryType(t){
    setDeliveryType(t)
}

function setCouponDisc(dis){
    setCouponDiscU(dis)
}
function setdeliveryDis(dis){
    setdeliveryDisU(dis)
}
// deliveryDis:{},
// setdeliveryDis:(e)=>{}

// openEmailForm:false,
  function  emailFormToggle(){
    setEmailFormToggle(!openEmailForm)
    }

return(
    <SiteContext.Provider value={{
        open,
        openBargerMenu,
        sideBarToggle:togleMenu,
        bargerMenuToggle,
        openEmailForm,
        emailFormToggle,
        deliveryType,
        chageDeliveryType,
        couponDisc,
    setCouponDisc,
    deliveryDis,
    setdeliveryDis,
    }}>

{children}

    </SiteContext.Provider>
)

}

