import type { Metadata } from "next";
import "../globals.css";
import Comcomp from "@/components/Comcomp";


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
     
      </Comcomp> 
      </body>
  </html>
    
     
     
  );
}
