import Navbar from "@/components/navigation/navbar";
import React, { ReactNode } from "react";
import LeftSidebar from "@/components/navigation/LeftSidebar";
import RightSIdebar from "@/components/navigation/RightSIdebar";

const RootLayout = ({ children }: { children: ReactNode }) => {
   return (
      <main className="background-light850_dark100 relative">
         <Navbar />
         <div className="flex">
            <LeftSidebar />

            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
               {/* the children here is root/page.tsx */}
               <div className="max-auto w-full max-w-5xl">{children}</div>
            </section>

            <RightSIdebar />
         </div>
      </main>
   );
};

export default RootLayout;
