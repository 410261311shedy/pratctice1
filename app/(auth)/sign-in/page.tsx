//since we pass some props to a client component, we have to make this page into client component
"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema } from "@/lib/validations";
import React from "react";

const SignIn = () => {
   return (
      <AuthForm
         formType="SIGN_IN"
         schema={SignInSchema}
         defaultValues={{ email: "", password: "" }}
         onSubmit={(data) => Promise.resolve({ sucess: true, data })}
      />
   );
};

export default SignIn;
