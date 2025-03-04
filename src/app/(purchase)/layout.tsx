import type { Metadata } from "next";
import "../globals.css";
import Comcomp from "@/components/Comcomp";
import Cart from "@/components/CartBottom/CartBottom"


export const metadata: Metadata = {
  title: "Pea and fry",
  description: "Pea and fry food web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
    <body>
      
    <Comcomp>
     
    
    {children}
    <div className="sticky  bottom-4 flex justify-end pr-3 z-50"><Cart /></div>  
      </Comcomp> 
      </body>
  </html>
    
     
     
  );
}
