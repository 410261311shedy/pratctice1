import { model, models, Schema, Types, Document } from "mongoose";

//Types.ObjectId is from mongoose
export interface Icollection {
   author: Types.ObjectId;
   question: Types.ObjectId;
}
export interface IcollectionDoc extends Icollection, Document {}
const collectionSchema = new Schema<Icollection>(
   {
      //who is adding it to the collection
      author: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      //which question is added :ref to a question
      question: {
         type: Schema.Types.ObjectId,
         ref: "Question",
         required: true,
      },
   },
   { timestamps: true }
);

const collection =
   models?.collection || model<Icollection>("collection", collectionSchema);

export default collection;
