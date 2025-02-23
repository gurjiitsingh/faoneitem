"use client"
import SiteContext from "./SiteContext";
import { useState } from 'react'

export const SiteProvider = ({children}) =>{

const [open, setIsOpen] = useState();
const [openBargerMenu, setOpenBargerMenu] = useState();
const [openEmailForm, setEmailFormToggle] = useState();
function togleMenu(){
        setIsOpen(!open);
    }
function bargerMenuToggle(){
    setOpenBargerMenu(!openBargerMenu);
}

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
    }}>

{children}

    </SiteContext.Provider>
)

}

