//連接tag跟question來看一個tag裡面有被多少question引用
import { model, models, Schema, Types } from "mongoose";

//Types.ObjectId is from mongoose
export interface ITagQuestion {
   tag: Types.ObjectId;
   question: Types.ObjectId;
}
const TagQuestionSchema = new Schema<ITagQuestion>(
   {
      tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
      question: {
         type: Schema.Types.ObjectId,
         ref: "Question",
         required: true,
      },
   },
   { timestamps: true }
);

const TagQuestion =
   models?.TagQuestion || model<ITagQuestion>("TagQuestion", TagQuestionSchema);

export default TagQuestion;
