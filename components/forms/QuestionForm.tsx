"use client";
import { AskQuestionSchema } from "@/lib/validations";
import React, { useRef } from "react";
import { Path, useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { z } from "zod";
import TagCard from "../cards/TagCard";

const Editor = dynamic(() => import("@/components/editor"), {
   // Make sure we turn SSR off
   ssr: false,
});
const QuestionForm = () => {
   const editorRef = useRef<MDXEditorMethods>(null);
   const form = useForm<z.infer<typeof AskQuestionSchema>>({
      resolver: zodResolver(AskQuestionSchema),
      defaultValues: {
         title: "",
         content: "",
         tags: [],
      },
   });

   const handleInputKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      field: { value: string[] }
   ) => {
      if (e.key === "Enter") {
         //prevent it reload the page after submit
         e.preventDefault();
         const tagInput = e.currentTarget.value.trim();
         //"!field.value.includes(tagInput)" check if the tag doesnt already exist on the tags array
         if (
            tagInput &&
            tagInput.length < 15 &&
            !field.value.includes(tagInput)
         ) {
            //spread the tags value and append the tagInput to the tags array
            form.setValue("tags", [...field.value, tagInput]);
            //clean up this event
            e.currentTarget.value = "";
            form.clearErrors("tags");
         } else if (tagInput.length > 15) {
            form.setError("tags", {
               type: "manual",
               message: "Tag should be less tham 15 characters",
            });
         } else if (field.value.includes(tagInput)) {
            form.setError("tags", {
               type: "manual",
               message: "Tag already exists",
            });
         }
      }
   };

   const handleTagRemove = (tag: string, field: { value: string[] }) => {
      // keep all of tags besides the tag that we just clicked on
      const newTags = field.value.filter((t) => t !== tag);

      form.setValue("tags", newTags);

      if (newTags.length === 0) {
         form.setError("tags", {
            type: "manual",
            message: "Tags are required",
         });
      }
   };
   const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
      console.log(data);
   };

   return (
      <Form {...form}>
         <form
            className="flex w-full flex-col gap-10"
            onSubmit={form.handleSubmit(handleCreateQuestion)}
         >
            {/* Question Title */}
            <FormField
               control={form.control}
               name="title"
               render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                     <FormLabel className="paragraph-semibold text-dark400_ligh800">
                        Question Title
                        <span className="text-primary-500 ">*</span>
                     </FormLabel>
                     <FormControl>
                        <Input
                           className="paragraph-regular background-light900_dark300 light-border-2
                              text-dark300_light700 no-focus min-h-[56px] border"
                           {...field}
                        />
                     </FormControl>
                     <FormDescription className="body-regular text-light-500 mt-2.5">
                        Be specific and imagine you&apos;re asking question to
                        another person.
                     </FormDescription>
                     <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
               )}
            />
            {/* Detailed explanation of your problem?  */}
            <FormField
               control={form.control}
               name="content"
               render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                     <FormLabel className="paragraph-semibold text-dark400_ligh800">
                        Detailed explanation of your problem?
                        <span className="text-primary-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <Editor
                           value={field.value}
                           editorRef={editorRef}
                           fieldChange={field.onChange}
                        />
                     </FormControl>
                     <FormDescription className="body-regular text-light-500 mt-2.5">
                        Introduce the problem and expand on what you&apos;ve put
                        it in the title.
                     </FormDescription>
                     <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
               )}
            />
            {/* Tags  */}
            <FormField
               control={form.control}
               name="tags"
               render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-3">
                     <FormLabel className="paragraph-semibold text-dark400_ligh800">
                        Tags
                        <span className="text-primary-500">*</span>
                     </FormLabel>
                     <FormControl>
                        <div>
                           <Input
                              className="paragraph-regular background-light900_dark300 light-border-2
                              text-dark300_light700 no-focus min-h-[56px] border"
                              placeholder="Add tags..."
                              onKeyDown={(e) => handleInputKeyDown(e, field)}
                           />

                           {field.value.length > 0 && (
                              <div className="flex-star mt-2.5 flex-wrap gap-2.5">
                                 {field?.value?.map((tag: string) => (
                                    <TagCard
                                       key={tag}
                                       _id={tag}
                                       name={tag}
                                       compact
                                       remove
                                       isButton
                                       handleRemove={() =>
                                          handleTagRemove(tag, field)
                                       }
                                    />
                                 ))}
                              </div>
                           )}
                        </div>
                     </FormControl>
                     <FormDescription className="body-regular text-light-500 mt-2.5">
                        Add up to 3 tags to describe what your question is
                        about. You need to press enter to add a tag.
                     </FormDescription>
                     <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
               )}
            />
            <div className="mt-16 flex justify-end">
               <Button
                  type="submit"
                  className="primary-gradient w-fit text-light-900!"
               >
                  Ask A Question
               </Button>
            </div>
         </form>
      </Form>
   );
};

export default QuestionForm;
