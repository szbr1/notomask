import type { Metadata } from "next";
import Header from "../_components/Header";
import Sidebar from "./_components/Sidebar";



export const metadata: Metadata = {
  title: "Home Page to Manage Your Passwords.",
  description: "This page is for storing passwords important documents safely have highly encryption environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <Header />
        <div className="flex h-full ">
            <Sidebar/>
            <div className="border-t border-black w-full p-3">
            {children}  
            </div>
        </div>
        
      </body>
    </html>
  );
}
