"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";
import React from "react";

const SignUp = () => {
   return (
      <AuthForm
         formType="SIGN_UP"
         schema={SignUpSchema}
         defaultValues={{ username: "", name: "", email: "", password: "" }}
         onSubmit={(data) => Promise.resolve({ sucess: true, data })}
      />
   );
};

export default SignUp;
