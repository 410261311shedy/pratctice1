//this is an errors handler

import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http-errors";
import { ZodError } from "zod";
import { errorMonitor } from "events";

export type ResponseType = "api" | "server";

const formatResponse = (
   responseType: ResponseType,
   status: number,
   message: string,
   errors?: Record<string, string[]> | undefined //undefined is for when not getting any additional info thru the error
) => {
   //forming our response patterns
   const responseContent = {
      success: false,
      error: {
         message,
         details: errors,
      },
   };

   return responseType === "api"
      ? NextResponse.json(responseContent, { status })
      : { status, ...responseContent };
};

const handleError = (
   error: unknown,
   //set RespponseType default to server action, cuz we have more in this app
   responseType: ResponseType = "server"
) => {
   if (error instanceof RequestError) {
      return formatResponse(
         responseType,
         error.statusCode,
         error.message,
         error.errors
      );
   }
   //validation error
   if (error instanceof ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of error.issues) {
         const field = issue.path.join(".");
         if (!fieldErrors[field]) {
            fieldErrors[field] = [];
         }
         fieldErrors[field].push(issue.message);
      }
      const validationError = new ValidationError(fieldErrors);

      return formatResponse(
         responseType,
         validationError.statusCode,
         validationError.message,
         validationError.errors
      );
   }
   if (error instanceof Error) {
      return formatResponse(responseType, 500, error.message);
   }

   return formatResponse(responseType, 500, "An unexpected error occured");
};
export default handleError;
