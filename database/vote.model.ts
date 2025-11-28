import { model, models, Schema, Types } from "mongoose";

//Types.ObjectId is from mongoose
export interface IVote {
   author: Types.ObjectId;
   id: Types.ObjectId;
   type: "question" | "answer";
   //string and only can be the one we seted up
   voteType: "upvote" | "downvote";
}

const VoteSchema = new Schema<IVote>({
   // who vote it
   author: { type: Schema.Types.ObjectId, ref: "User", required: true },
   id: { type: Schema.Types.ObjectId, required: true },
   //enum to set the string value can only be...
   type: { type: String, enum: ["question", "answer"], required: true },
   voteType: { type: String, enum: ["upvote", "downvote"], required: true },
});

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
