//Declares global types in TS
//To keep ypur code organized and reusable

import { NextResponse } from "next/server";

//no need to be imported
interface Tag {
   _id: string;
   name: string;
}

interface Author {
   _id: string;
   name: string;
   image: string;
}

interface Question {
   _id: string;
   title: string;
   //tags in the question is just an array of diff tag interfaces
   tags: Tag[];
   author: Author;
   createdAt: Date;
   upvotes: number;
   answers: number;
   views: number;
}

//using ts generic T to maek this system scalable
// since we can know exactly how each one of our responses look like
type ActionResponse<T = null> = {
   success: boolean;
   data?: T;
   //if we don't have the data return an type object error
   error?: {
      message: string;
      details?: Record<string, string[]>;
   };
   status?: number;
};

//defining diff type of responses
type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };
//NextResponse is a wrapper around the base HTTP API response
//it's modifying the original one and appending additional properties
type APIErrorResponse = NextResponse<ErrorResponse>;
//regular APIresponse
type APIresponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;
