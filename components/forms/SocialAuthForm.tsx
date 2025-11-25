"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import ROUTES from "@/constants/routes";
import { signIn } from "next-auth/react";
const SocialAuthForm = () => {
   const buttonClass =
      "background-dark400_light900 body-medium text-dark-200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";
   const handleSignIn = async (provider: "github" | "google") => {
      try {
         //for testing
         //throw new Error("Not implmented");
         await signIn(provider, {
            callbackUrl: ROUTES.HOME,
         });
      } catch (error) {
         console.log(error);

         toast.error(
            error instanceof Error ? error.message : "An error occurred",
            {
               description: "Please try again later.",
            }
         );
      }
   };
   return (
      <div className="mt-10 flex flex-wrap gap-2.5">
         {/* gitHub auth button          onClick is equal to a callback function where we call handle sign in*/}
         <Button className={buttonClass} onClick={() => handleSignIn("github")}>
            <Image
               src="/icons/github.svg"
               alt="Github Logo"
               width={20}
               height={20}
               className="invert-colors mr-2.5 object-contain"
            />
            <span>Log in with Github</span>
         </Button>
         {/* Google auth button*/}
         <Button className={buttonClass} onClick={() => handleSignIn("google")}>
            <Image
               src="/icons/google.svg"
               alt="Google Logo"
               width={20}
               height={20}
               className="invert-colors mr-2.5 object-contain"
            />
            <span>Log in with Google</span>
         </Button>
      </div>
   );
};

export default SocialAuthForm;
