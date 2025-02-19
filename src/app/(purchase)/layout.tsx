import type { Metadata } from "next";
import "../globals.css";

import Header from "@/components/Header";
import Comcomp from "@/components/comcomp";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
     
      <Header />
    {children}
     
      </Comcomp> 
      </body>
  </html>
    
     
     
  );
}
