//tracking user's actions for algorithm
import { model, models, Schema, Types } from "mongoose";

//Types.ObjectId is from mongoose
export interface IInteraction {
   user: Types.ObjectId;
   action: string;
   actionId: Types.ObjectId;
   actionType: "question" | "answer";
}
const InteractionSchema = new Schema<IInteraction>(
   {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      action: { type: String, required: true }, //upvote,downvote,question,answer,user,view.etc
      actionId: { type: Schema.Types.ObjectId, required: true }, //question/answer/user ID
      actionType: {
         type: String,
         enum: ["question", "answer"],
         required: true,
      },
   },
   { timestamps: true }
);

const Interaction =
   models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
