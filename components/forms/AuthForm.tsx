"use client";
//use for validation
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
//to keep track of our form states
import {
   DefaultValues,
   Field,
   FieldValue,
   FieldValues,
   Path,
   SubmitHandler,
   useForm,
} from "react-hook-form";
import { object, z, ZodType } from "zod";

//importing shadcn components for buttons
import { Button } from "@/components/ui/button";
//importing shadcn components for forms
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
//importing shadcn components for input
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";

//defining the form schema, we wanna make this reusable and extensible
//so we're create our own validations in lib/validation.ts

interface AuthFormProps<T extends FieldValues> {
   schema: ZodType<T>;
   defaultValues: T;
   onSubmit: (data: T) => Promise<{ sucess: boolean }>;
   formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
   schema,
   defaultValues,
   formType,
   onSubmit,
}: AuthFormProps<T>) => {
   // 1. Define your form.
   const form = useForm<z.infer<typeof schema>>({
      resolver: standardSchemaResolver(schema),
      defaultValues: defaultValues as DefaultValues<T>,
   });
   //create our own submit handler which is of a type SubmitHandler<T>
   const handleSubmit: SubmitHandler<T> = async () => {
      // TODO: Authenticate User
   };

   //create a buttonText to help client know which form we're on
   const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-10 space-y-5"
         >
            {/*use this to pass the default values. Like email or password */}
            {Object.keys(defaultValues).map((field) => (
               <FormField
                  key={field}
                  control={form.control}
                  name={field as Path<T>}
                  render={({ field }) => (
                     <FormItem className="flex w-full flex-col gap-2.5">
                        <FormLabel className="paragraph-medium text-dark400_ligh700">
                           {field.name === "email"
                              ? "Email Address"
                              : field.name.charAt(0).toUpperCase() +
                                field.name.slice(1)}
                        </FormLabel>
                        <FormControl>
                           <Input
                              required
                              type={
                                 field.name === "password" ? "password" : "text"
                              }
                              {...field}
                              className="paragraph-regular background-light900_dark300 light-border-2
                              text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            ))}

            {/*use react hook form to get the issubmitting state*/}
            <Button
               disabled={form.formState.isSubmitting}
               className="primary-gradient paragraph-medium min-h-12 w-full rounded-4xl px-4 py-3 font-inter text-light-900!"
            >
               {form.formState.isSubmitting
                  ? buttonText === "Sign In"
                     ? "Signing In..."
                     : "Signing Up..."
                  : buttonText}
            </Button>

            {formType === "SIGN_IN" ? (
               <p>
                  Don&apos;t have an account?{" "}
                  <Link
                     href={ROUTES.SIGN_UP}
                     className="paragraph-semibold primary-text-gradient"
                  >
                     Sign up
                  </Link>
               </p>
            ) : (
               <p>
                  Already have an account?{" "}
                  <Link
                     href={ROUTES.SIGN_IN}
                     className="paragraph-semibold primary-text-gradient"
                  >
                     Sign in
                  </Link>
               </p>
            )}
         </form>
      </Form>
   );
};

export default AuthForm;
