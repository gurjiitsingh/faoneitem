import { UseSiteContext } from '@/SiteContext/SiteContext';
import React from 'react'

export default function DeliveryCost() {
    
      const {  deliveryDis, deliveryType } = UseSiteContext();
  return (
    <>{deliveryType === "delivery" &&
     
            <div className="font-semibold border-b py-3 w-full flex justify-between">
              <button className="text-sm font-semibold py-3 w-full text-left">
                Delivery cost
              </button>
              {deliveryDis?.price !== undefined &&
              <div className="flex gap-1">
                <span>&#8364;</span> <span>{deliveryDis?.price} </span>
              </div>}
              {deliveryDis?.price === undefined &&
              <div className="flex gap-1 justify-start">

                {/* <span className="text-sm font-extralight">Please enter full address for delivery estimation </span> */}
                <span className="text-sm font-extralight">Bitte geben Sie die vollständige Adresse für die Lieferzeitschätzung ein </span>
              </div>}
            </div>}
         
    
    </>
  )
}
