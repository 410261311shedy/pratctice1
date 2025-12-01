import { Document, model, models, Schema, Types } from "mongoose";

//Types.ObjectId is from mongoose
export interface IVote {
   author: Types.ObjectId;
   actionid: Types.ObjectId; //To avoid conflict with Document
   actiopntype: string; //cuz Document already have both
   //string and only can be the one we seted up
   voteType: string;
}
export interface IVoteDoc extends IVote, Document {}
const VoteSchema = new Schema<IVote>(
   {
      // who vote it
      author: { type: Schema.Types.ObjectId, ref: "User", required: true },
      actionid: { type: Schema.Types.ObjectId, required: true },
      //enum to set the string value can only be...
      actiopntype: {
         type: String,
         enum: ["question", "answer"],
         required: true,
      },
      voteType: { type: String, enum: ["upvote", "downvote"], required: true },
   },
   { timestamps: true }
);

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
