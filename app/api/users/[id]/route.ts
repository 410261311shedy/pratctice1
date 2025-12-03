import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse, APIresponse } from "@/types/global";
import User from "@/database/user.model";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";
import { UserSchema } from "@/lib/validations";

//GET /api/users/[id]::get user by id
export async function GET(
   _: Request,
   { params }: { params: Promise<{ id: string }> }
) {
   const { id } = await params;
   //"User nor found"
   if (!id) throw new NotFoundError("User");

   try {
      await dbConnect();
      //                      findOne({_id:id})
      const user = await User.findById(id);
      if (!user) throw new NotFoundError("User");

      return NextResponse.json({ success: true, data: user }, { status: 200 });
   } catch (error) {
      return handleError(error, "api") as APIErrorResponse;
   }
}
//DELETE /api/users/[id]   later will add the delete for the question that the user have
export async function DELETE(
   //the "_" here is just a placeholder for finishing the line
   _: Request,
   { params }: { params: Promise<{ id: string }> }
) {
   const { id } = await params;
   if (!id) throw new NotFoundError("User");

   try {
      await dbConnect();
      //                     method given by mongoose
      const user = await User.findByIdAndDelete(id);
      if (!user) throw new NotFoundError("User");
      // user ... successfully deleted                          means:requset successful
      return NextResponse.json({ success: true, data: user }, { status: 200 });
   } catch (error) {
      return handleError(error, "api") as APIErrorResponse;
   }
}
//PUT /api/users/[id]
export async function PUT(
   // the request is gonna be used in the function
   request: Request,
   { params }: { params: Promise<{ id: string }> }
) {
   const { id } = await params;
   if (!id) throw new NotFoundError("User");

   try {
      await dbConnect();
      //validate the data
      const body = await request.json(); //get access to the data
      const validatedData = UserSchema.partial().parse(body);
      //console.log(body);
      //                                      id and the part need to be updated
      const user = await User.findByIdAndUpdate(id, validatedData, {
         // true: get the data after update,vice versa
         new: true,
      });
      if (!user) throw new NotFoundError("User");
      return NextResponse.json({success:true,data: })
   } catch (error) {}
}
