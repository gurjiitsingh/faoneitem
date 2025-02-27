"use client"
import { boolean, number, string } from "zod";
import SiteContext from "./SiteContext";
import { use, useEffect, useState } from 'react'

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
const [showProductDetailM, setShowProductDetailML] = useState(false);
const [ baseProductId,setBaseProductIdL] = useState("")


   
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

    
  function  setShowProductDetailM(){
    setShowProductDetailML(!showProductDetailM)
//showProductDetailM,
  }
  
  

     function setBaseProductId(id){
        setBaseProductIdL(id)
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
    showProductDetailM,
    setShowProductDetailM,
    baseProductId,
     setBaseProductId,
    }}>

{children}

    </SiteContext.Provider>
)

}

