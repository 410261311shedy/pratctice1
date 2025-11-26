"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import path from "path";
import React from "react";
import { cn } from "@/lib/utils";
import { is } from "zod/v4/locales";
import { SheetClose } from "@/components/ui/sheet";

//set the isMobileNav to default false, which means that
// it'll only be true if we explicitly pass it as a prop
//isMobileNav? means it is optional
const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
   //only can use on the client
   const pathname = usePathname();
   //for testing
   const userId = 1;
   return (
      <>
         {sidebarLinks.map((item) => {
            const isActive =
               (pathname.includes(item.route) && item.route.length > 1) ||
               pathname === item.route;
            //every client has it's own profile route depends on its userId, make profile a dynamic route
            if (item.route === "/profile") {
               if (userId) {
                  item.route = `${item.route}/${userId}`;
               } else {
                  return null;
               }
            }
            const LinkComponent = (
               <Link
                  href={item.route}
                  key={item.label}
                  className={cn(
                     isActive
                        ? "primary-gradient rounded-lg text-light-900"
                        : "text-dark300_light900",
                     "flex items-center justify-start gap-4 bg-transparent p-4"
                  )}
               >
                  <Image
                     src={item.imgURL}
                     alt={item.label}
                     width={20}
                     height={20}
                     className={cn({ "invert-colors": !isActive })}
                  />
                  <p
                     className={cn(
                        isActive ? "base-bold" : "base-medium",
                        //hide the navbar on desktop if it's not mobile nav.
                        !isMobileNav && "max-lg:hidden"
                     )}
                  >
                     {item.label}
                  </p>
               </Link>
            );

            return isMobileNav ? (
               <SheetClose asChild key={item.route}>
                  {LinkComponent}
               </SheetClose>
            ) : (
               <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
            );
         })}
      </>
   );
};

export default NavLinks;
