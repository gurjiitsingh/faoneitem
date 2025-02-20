'use client'

import ListView from './components/ListView'
import Link from "next/link"

export default function Page({params}:{params:{id:string}}){
  const id = params.id as string;
  
  console.log("productaddon view page------", id)
  return (
    <div className='h-screen flex flex-col '>
      <div className="flex justify-between">
      <h1>Products Addons </h1>
      <Link href={`/admin/productsaddon/form/${id}`}><button className="bg-[#313131] text-sm text-white px-4 py-2 rounded-lg">Create</button></Link>
      </div>

      <ListView id={id} />

    </div>
  )
}
