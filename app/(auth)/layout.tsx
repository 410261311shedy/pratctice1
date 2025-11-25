import React, { ReactNode } from "react";
import Image from "next/image";
import SocialAuthForm from "@/components/forms/SocialAuthForm";

const AuthLayout = ({ children }: { children: ReactNode }) => {
   return (
      <main
         className="flex min-h-screen items-center 
      justify-center bg-auth-light dark:bg-auth-dark
      bg-cover bg-center bg-no-repeat px-4 py-10"
      >
         <section className="light-border background-light800_dark200 shadow-light-100_dark100 min-w-full rounded-[10px] border px-10 py-10 shadow-md sm:min-w-[520px] sm:px-8">
            <div className="flex items-center justify-between gap-2">
               <div className="space-y-2.5">
                  <h1 className="h2-bold text-dark-100_light900">
                     Join DevFlow
                     <p className="paragraph-regular text-dark500_light400">
                        To get your questions answered
                     </p>
                  </h1>
               </div>
               <Image
                  src="/images/site-logo.svg"
                  alt="DevFlow logo"
                  width={50}
                  height={50}
                  className="object-contain"
               />
            </div>

            {children}
            <SocialAuthForm />
         </section>
      </main>
   );
};

export default AuthLayout;
