import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";
import { ValidationError } from "@/lib/http-errors";
import z from "zod";

//get user info from db
export async function GET() {
   try {
      await dbConnect();
      const users = await User.find();
      //form a special structure      and rename the data we destructured users
      return NextResponse.json({ success: true, data: users }, { status: 200 });
   } catch (error) {
      return handleError(error, "api") as APIErrorResponse;
   }
}
//create user action
//accepts the request of a type Request
export async function POST(request: Request) {
   try {
      await dbConnect();
      //extract the value from the body
      const body = await request.json();
      //to see if the data is the right format to be passed to db
      //                               here to parse the body
      const validatedData = UserSchema.safeParse(body);
      if (!validatedData.success) {
         const flattened = z.flattenError(validatedData.error);
         //it's not allowed to make the request if not validated,and throw a new validation error
         throw new ValidationError(flattened.fieldErrors); //e.g. you need to put an email
      }
      //else: if validated, see if we already have an existing user
      const { email, username } = validatedData.data;
      //try to find if there's an existing User thru email
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exist");
      //try to find if there's an existing User thru username
      const existingUsername = await User.findOne({ username });
      if (existingUsername) throw new Error("Username already exist");
      //.data extract it into suitable data for creating
      const newUser = await User.create(validatedData.data);
      return NextResponse.json(
         { success: true, data: newUser },
         { status: 201 }
      ); //201 means created
   } catch (error) {
      return handleError(error, "api") as APIErrorResponse;
   }
}
